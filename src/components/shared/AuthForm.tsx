"use client";

import { useState, useCallback, FormEvent, ChangeEventHandler } from "react";
import { register, signin } from "@/lib/api";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/shared/Input";
import { Card } from "@/components/shared/Card";
import { registerContent, signinContent } from "@/constants";
import Link from "next/link";

const initial = { email: "", password: "", firstName: "", lastName: "" };

interface AuthFormProps {
  type?: "signin" | "register";
}

export const AuthForm = ({ type = "signin" }: AuthFormProps) => {
  const [form, setForm] = useState({ ...initial });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        if (type === "signin") {
          await signin(form);
        } else {
          await register(form);
        }
        router.push("/");
      } catch (err) {
        console.error(err);

        if (err instanceof Error) {
          setError(err.message);
        }
      }

      setForm({ ...initial });

      router.replace("/");
    },
    [type, router, form]
  );

  const content = type === "signin" ? signinContent : registerContent;

  return (
    <Card>
      {error && <p className="text-red-500 text-xl">{error}</p>}

      <div className="w-full">
        <div className="text-center">
          <h2 className="text-3xl mb-2">{content.header}</h2>
          <p className="tex-lg text-black/25">{content.subheader}</p>
        </div>
        <form onSubmit={handleSubmit} className="py-10 w-full">
          {type === "register" && (
            <div className="flex mb-8 justify-between">
              <div className="pr-2">
                <div className="text-lg mb-4 ml-2 text-black/50">
                  First Name
                </div>
                <Input
                  required
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
              <div className="pl-2">
                <div className="text-lg mb-4 ml-2 text-black/50">Last Name</div>
                <Input
                  required
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Email</div>
            <Input
              required
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <div className="text-lg mb-4 ml-2 text-black/50">Password</div>
            <Input
              required
              name="password"
              value={form.password}
              type="password"
              placeholder="Password"
              className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span>
                <Link
                  href={content.linkUrl}
                  className="text-blue-600 font-bold"
                >
                  {content.linkText}
                </Link>
              </span>
            </div>
            <div>
              <Button type="submit" variant="secondary">
                {content.buttonText}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Card>
  );
};
