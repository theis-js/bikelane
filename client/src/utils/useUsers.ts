import { useState, useEffect } from "react";

export interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created: string;
}

export function useUsers(): User[] {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("users");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        setUsers(parsed.result || []);
      } catch {
        setUsers([]);
      }
    }
  }, []);

  return users;
}