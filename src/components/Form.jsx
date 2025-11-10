"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Form() {
  const [activeForm, setActiveForm] = useState("intro");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Connect this to backend or database next.");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Portfolio Admin Panel
          </CardTitle>
        </CardHeader>

        <CardContent>
          {/* Section Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["intro", "about", "skills", "experience", "projects", "contact"].map((section) => (
              <Button
                key={section}
                onClick={() => setActiveForm(section)}
                variant={activeForm === section ? "default" : "outline"}
              >
                {section.replace(/^\w/, (c) => c.toUpperCase())}
              </Button>
            ))}
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* INTRO SECTION */}
            {activeForm === "intro" && (
              <>
                <Label>Your Name</Label>
                <Input placeholder="Eg. Virender Singh" required />

                <Label>Short Title</Label>
                <Input placeholder="Eg. Frontend Developer" required />

                <Label>Short Intro Line</Label>
                <Textarea placeholder="Eg. I love building dynamic UI." required />
              </>
            )}

            {/* ABOUT SECTION */}
            {activeForm === "about" && (
              <>
                <Label>Profile Image URL</Label>
                <Input placeholder="Eg. https://your-image-link.jpg" />

                <Label>About Description</Label>
                <Textarea placeholder="Tell something about yourself..." required />

                <Label>Resume Link</Label>
                <Input placeholder="Paste resume link" />
              </>
            )}

            {/* SKILLS SECTION */}
            {activeForm === "skills" && (
              <>
                <Label>Skill Name</Label>
                <Input placeholder="Eg. React.js" required />

                <Label>Skill Category</Label>
                <Input placeholder="Eg. Frontend / Backend / Tools" required />

                <Label>Skill Level (1–100)</Label>
                <Input type="number" placeholder="Eg. 90" required />
              </>
            )}

            {/* EXPERIENCE SECTION */}
            {activeForm === "experience" && (
              <>
                <Label>Company Name</Label>
                <Input placeholder="Eg. Microsoft" required />

                <Label>Role</Label>
                <Input placeholder="Eg. Junior Developer" required />

                <Label>Start Date</Label>
                <Input placeholder="Eg. Jan 2024" />

                <Label>End Date</Label>
                <Input placeholder="Eg. Present" />

                <Label>Description</Label>
                <Textarea placeholder="What did you work on?" required />
              </>
            )}

            {/* PROJECTS SECTION */}
            {activeForm === "projects" && (
              <>
                <Label>Project Name</Label>
                <Input placeholder="Eg. Portfolio Website" required />

                <Label>Live Link</Label>
                <Input placeholder="Eg. https://yourproject.com" />

                <Label>GitHub Link</Label>
                <Input placeholder="Eg. https://github.com/..." />

                <Label>Tech Stack Used</Label>
                <Input placeholder="Eg. React, Tailwind, Framer Motion" required />

                <Label>Description</Label>
                <Textarea placeholder="Describe your project" required />
              </>
            )}

            {/* CONTACT SECTION */}
            {activeForm === "contact" && (
              <>
                <Label>Email</Label>
                <Input placeholder="Eg. example@gmail.com" required />

                <Label>Phone Number</Label>
                <Input placeholder="Eg. +91 9876543210" />

                <Label>Address</Label>
                <Textarea placeholder="City / Country" />
              </>
            )}

            <Button type="submit" className="w-full">Save</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
