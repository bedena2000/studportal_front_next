"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "motion/react";

export default function HomeWelcome() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="filter"
      >
        <Image
          alt="welcome"
          src="/images/registration_student.png"
          width={600}
          height={600}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <p className="text-white text-2xl max-w-[800px]">
          შექმენი ჯგუფი, მოიწვიე თანაკურსელები, გააზიარე სასწავლო მასალა და
          დამატებითი ინფორმაცია
        </p>
        <div className="flex items-center gap-2 mt-6">
          <Link className="cursor-pointer" href="/login">
            <Button className="cursor-pointer">შესვლა</Button>
          </Link>
          <Link className="cursor-pointer" href="/register">
            <Button className="cursor-pointer" variant="outline">
              რეგისტრაცია
            </Button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
