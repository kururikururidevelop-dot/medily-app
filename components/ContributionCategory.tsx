import React from 'react';

export default function ContributionCategory({ items = [{name:'内科',pct:45},{name:'小児科',pct:30},{name:'皮膚科',pct:15}] }: { items?: {name:string;pct:number}[] }){
  return (
    <div className="space-y-4">
      {items.map((it, idx)=> (
        <div key={idx}>
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="font-bold text-[#0d1b12] dark:text-gray-200">{it.name}</span>
            <span className="text-primary font-bold">{it.pct}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div className="bg-primary h-1.5 rounded-full" style={{width:`${it.pct}%`}} />
          </div>
        </div>
      ))}
    </div>
  )
}
