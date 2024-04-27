"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

// Import your table and select components here
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const classList = {
  1: { name: "青木" },
  2: { name: "青柳" },
  3: { name: "荒瀬" },
  5: { name: "李" },
  6: { name: "王くん" },
  7: { name: "王さん" },
  10: { name: "小野" },
  11: { name: "郭" },
  14: { name: "河田" },
  17: { name: "斉藤" },
  18: { name: "貞廣" },
  19: { name: "篠﨑" },
  20: { name: "張" },
  21: { name: "周" },
  22: { name: "須一" },
  25: { name: "陳" },
  26: { name: "チェン" },
  27: { name: "ちょう" },
  28: { name: "都筑" },
  29: { name: "坪谷" },
  30: { name: "杜" },
  31: { name: "斗星" },
  35: { name: "潘" },
  36: { name: "平瀬" },
  39: { name: "ヴラド" },
  40: { name: "利" },
  41: { name: "廖" },
};

const initialUna1 = [
  ["26", "21", "39", "40", "14"],
  ["7", "11", "2", "3", "10"],
  ["5", "25", "27", "22", "28"],
  ["20", "41", "31", "1"],
  ["30", "29", "36", "19"],
  ["6", "35", "17", "18"],
];

const initialUna2 = [[], [], [], [], [], []];

function Home() {
  const [una1, setUna1] = useState(initialUna1);
  const [una2, setUna2] = useState(initialUna2);
  const { toast } = useToast();

  function isInSameSubArray(arr, num1, num2) {
    // Loop through each sub-array in arr
    for (let i = 0; i < arr.length; i++) {
      let hasNum1 = false;
      let hasNum2 = false;

      // Check each element in the sub-array
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] === num1) {
          hasNum1 = true;
        }
        if (arr[i][j] === num2) {
          hasNum2 = true;
        }

        // Early return if both numbers are found in the same sub-array
        if (hasNum1 && hasNum2) {
          return true;
        }
      }
    }

    // Return false if no sub-array contains both numbers
    return false;
  }

  function validateUnaArrays() {
    for (const subArray2 of una2) {
      for (let i = 0; i < subArray2.length; i++) {
        for (let j = i + 1; j < subArray2.length; j++) {
          const num1 = subArray2[i];
          const num2 = subArray2[j];
          if (isInSameSubArray(una1, num1, num2)) {
            const message = `[${subArray2.join(
              ","
            )}]のグルーブの中に無効なペアが見つかりました:${
              classList[num1].name
            }と${classList[num2].name} `;

            console.log(message);
            toast({
              variant: "destructive",
              description: message,
            });
            return false;
          }
        }
      }
    }
    console.log("All pairs are valid.");
    return true;
  }

  const handleSelectChange = (rowIndex, cellIndex, newValue) => {
    setUna2((prevUna2) => {
      // Create a deep copy of the array to avoid mutating the original state
      const newUna2 = prevUna2.map((row, index) => {
        if (index === rowIndex) {
          // Make a copy of the row to modify
          const newRow = [...row];
          // Update the specific cell with the new value
          newRow[cellIndex] = newValue;
          return newRow;
        }
        return row; // Return unchanged row for other indices
      });
      return newUna2; // Return the new state array
    });
  };

  useEffect(() => {
    validateUnaArrays(una1, una2);
    console.log(una1, una2);
  }, [una2]);

  return (
    <>
      <div className="bg-slate-200">
        <TableComponent title="u&a1" data={una1} />
        <TableComponent
          title="u&a2"
          data={una1}
          editable={true}
          onValueChange={handleSelectChange}
        />
      </div>
    </>
  );
}

function TableComponent({ title, data, editable = false, onValueChange }) {
  return (
    <div>
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>1</TableHead>
            <TableHead>2</TableHead>
            <TableHead>3</TableHead>
            <TableHead>4</TableHead>
            <TableHead>5</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}>
                  {editable ? (
                    <Select
                      onValueChange={(e) =>
                        onValueChange(rowIndex, cellIndex, e)
                      }
                    >
                      <SelectTrigger className="w-[100%]">
                        <SelectValue placeholder="名前" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.keys(classList).map((key) => (
                            <SelectItem key={key} value={key}>
                              {classList[key].name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    classList[cell]?.name || "Empty"
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default Home;
