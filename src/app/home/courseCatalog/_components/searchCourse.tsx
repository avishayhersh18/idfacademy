"use client"
import React, { useState, useEffect } from 'react';
import {Badge, Button, Indicator, Input, Join, Select} from "react-daisyui"
interface SearchCourseProps{ 
    searchTerm:string,
    filterType:string,
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
    
    setFilterType:React.Dispatch<React.SetStateAction<string>>
    setDateRange: React.Dispatch<React.SetStateAction<{
      start: string;
      end: string;
  }>>
}

  const SearchCourse: React.FC<SearchCourseProps> = ({
    searchTerm,
    filterType,
    setSearchTerm,
    setFilterType,
    setDateRange,
  }) => {
    return (
      <Join>
        <div className="bg-white flex w-full items-center justify-center p-4 rounded-md gap-5">
        <div>
          <div>
            <Input
              className="join-item" 
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col"> 
          <Select
            className="join-item btn flex-grow flex-shrink  bg-emerald-700 hover:bg-emerald-800 text-white" 
            onChange={(e) => setFilterType(e.target.value)}
          >
            <Select.Option value={""}>
              חיפוש לפי קטגוריה
            </Select.Option>
            <Select.Option value={"name"}>שם קורס</Select.Option>
            <Select.Option value={"date"}>תאריך יצירה</Select.Option>
          </Select>
          {filterType === "date" && (
            <div className="flex flex-row items-center">
              {/* Date range inputs */}
              <div>
                <p>From:</p>
                <input
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="form-input"
                />
              </div>
              <div>
                <p>To:</p>
                <input
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>
        </div>
      </Join>
      
    );
                }
  
  export default SearchCourse;