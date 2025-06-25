"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DEPARTMENTS = [
  "rj-tamil", "rj-english", "rj-hindi", "rj-telugu", "rj-malayalam",
  "hr", "content", "design", "camera", "events-and-sponsors",
  "editing", "sponsorship", "technical"
];

const YEARS = ["1", "2", "3", "4", "5"];

export default function JoinClubPage() {
  const [step, setStep] = useState(1);
  const [formStatus, setFormStatus] = useState("checking");
  const [questions, setQuestions] = useState<string[]>([]);
  const [deptInfo, setDeptInfo] = useState({ name: "", description: "" });
  const [formData, setFormData] = useState<any>({
    name: "",
    email: "",
    phone: "",
    year: "",
    department: "",
    answers: {},
  });
  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  useEffect(() => {
    const checkFormStatus = async () => {
      const res = await fetch("/api/form/status");
      const data = await res.json();
      setFormStatus(data.status);
    };
    checkFormStatus();
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (formData.department) {
        const res = await fetch(`/api/form/questions?dept=${formData.department}`);
        const data = await res.json();
        setQuestions(data.questions || []);
        setDeptInfo({ name: data.department, description: data.description });
      }
    };
    fetchQuestions();
  }, [formData.department]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("question-")) {
      setFormData((prev: any) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [name.replace("question-", "")]: value,
        },
      }));
    } else {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, phone, year, department, answers } = formData;

    if (!name || !email || !phone || !year || !department) {
      setMessage({ success: false, text: "Please fill in all required fields." });
      return;
    }

    for (const question of questions) {
      if (!answers[question]) {
        setMessage({ success: false, text: "Please answer all department questions." });
        return;
      }
    }
    setMessage({ success: false, text: "Processing" });
    const res = await fetch("/api/form/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setFormData({ name: "", email: "", phone: "", year: "", department: "", answers: {} });
      setStep(1); // ✅ go back to step 1 first
      setMessage({ success: true, text: "Application submitted successfully!" });
    } else {
      const err = await res.json();
      setMessage({ success: false, text: err.error });
    }
    setTimeout(() => {setMessage({ success: false, text: "" });
      }, 6000);
  };

  if (formStatus === "checking") return <p>Checking form availability...</p>;
  if (formStatus === "closed") return <p className="text-center mt-12 text-xl">Sorry, the form is currently closed!</p>;

  return (
    <Card className="bg-neutral-lightest border-neutral-light rounded-xl">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-text-primary">Join Our Club</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number</label>
                <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Year</label>
                  <select name="year" value={formData.year} onChange={handleChange} required className="w-full border p-2 rounded">
                    <option value="">Select Year</option>
                    {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Department</label>
                  <select name="department" value={formData.department} onChange={handleChange} required className="w-full border p-2 rounded">
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d.replace("rj-", "RJ ").replace(/-/g, " ")}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Button type="button" onClick={() => setStep(2)} className="mt-6 w-full bg-accent-orange text-white rounded-full">
                Next
              </Button>
              <div className="flex-1 text-center">
                  {message && (
                    <p className={`text-sm font-medium ${message.success ? "text-green-600" : "text-red-600"}`}>{message.text}</p>
                  )}
                </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-text-primary">{deptInfo.name}</h3>
                <p className="text-sm text-gray-600">{deptInfo.description}</p>
              </div>
              {questions.map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">{q}</label>
                  <Textarea
                    name={`question-${q}`}
                    value={formData.answers[q] || ""}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border p-2 rounded"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-between items-center mt-6">
                <Button type="button" onClick={() => setStep(1)} className="bg-gray-300 text-black rounded-full">Back</Button>
                <div className="flex-1 text-center">
                  {message && (
                    <p className={`text-sm font-medium `}>{message.text}</p>
                  )}
                </div>
                <Button type="submit" className="bg-accent-orange text-white rounded-full">Submit</Button>
              </div>
            </>
          )}
        </form>
      </CardContent>
    </Card>
  );
}