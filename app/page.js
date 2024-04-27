"use client";
import React, { useState, useEffect } from "react";

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

  useEffect(() => {
    validateUnaArrays(una1, una2);
  }, [una1, una2, validateUnaArrays]);

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

  function validateUnaArrays(una1, una2) {
    // Validate each sub-array in una2
    for (const subArray2 of una2) {
      // Generate all pairs from subArray2
      for (let i = 0; i < subArray2.length; i++) {
        for (let j = i + 1; j < subArray2.length; j++) {
          const num1 = subArray2[i];
          const num2 = subArray2[j];

          // Check if this pair is in the same sub-array in una1
          if (isInSameSubArray(una1, num1, num2)) {
            console.log(
              `Invalid pair found: (${num1}, ${num2}) in sub-array [${subArray2.join(
                ", "
              )}]`
            );
            return false; // Return false if any invalid pair is found
          }
        }
      }
    }

    // If no invalid pairs are found, return true
    console.log("All pairs are valid.");
    return true;
  }

  const handleSelectChange = (rowIndex, cellIndex, newValue) => {
    const updatedUna2 = una2.map((row, i) =>
      i === rowIndex
        ? [...row.slice(0, cellIndex), newValue, ...row.slice(cellIndex + 1)]
        : row
    );
    setUna2(updatedUna2);
  };

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
                        <SelectValue placeholder="Select Name" />
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
