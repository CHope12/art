"use client";
import { useState, useEffect } from "react";
import ItemArea from "@/components/itemArea";

export default function digitalList() {
  
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/getDigital");
      const data = await res.json();
      setItems(data.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="flex justify-center items-center gap-16 flex-wrap mx-64 min-h-96">
      {loading ? (
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
      ) : 
      items.length > 0 ? (
        <ItemArea items={items} />
      ) : (
        <p>No items found.</p>
      )}
    </div>
  )
  }