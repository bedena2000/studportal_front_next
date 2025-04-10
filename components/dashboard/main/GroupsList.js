"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useEffect } from "react";
import GroupItem from "../group/group-item";

export default function GroupsList({ groups, handleGroupChange }) {
  const [inputValue, setInputValue] = useState("");
  const [groupList, setGroupList] = useState(groups || []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    const trimmedInputValue = inputValue.trim();

    if (trimmedInputValue.length > 0) {
      setGroupList(
        groups.filter((group) => group.name.includes(trimmedInputValue))
      )
    }

    if (trimmedInputValue.length === 0) {
      setGroupList(groups);
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center gap-2">
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="ჯგუფის სახელი"
          className="border-2"
        />
        <Button onClick={handleSearch} className="cursor-pointer">
          მოძებნა
        </Button>
      </div>

      <p className="mt-4">ჯგუფების რაოდენობა: {groupList.length}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {groupList.map((group) => <GroupItem key={group.id} group={group} />)}
      </div>
    </>
  );
}
