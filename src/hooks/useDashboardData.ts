import { useState, useEffect } from "react";
import { ArrowUpRight, ArrowDownRight, Users, MessageSquare, TrendingUp, AlertTriangle } from "lucide-react";

// Mock Data Models
export const timelines = {
  "24h": {
    trendData: [
      { time: '00:00', sentiment: 45, volume: 120 },
      { time: '04:00', sentiment: 52, volume: 145 },
      { time: '08:00', sentiment: 38, volume: 380 },
      { time: '12:00', sentiment: 65, volume: 520 },
      { time: '16:00', sentiment: 58, volume: 480 },
      { time: '20:00', sentiment: 72, volume: 310 },
      { time: '24:00', sentiment: 68, volume: 220 },
    ],
    topicData: [
      { name: 'AI Safety', count: 4200 },
      { name: 'Market Shift', count: 3100 },
      { name: 'Product Launch', count: 2800 },
      { name: 'Competitor', count: 1950 },
      { name: 'Regulation', count: 1500 },
    ],
    kpis: [
      { label: "Total Mentions", value: "84,392", change: "+12.5%", positive: true, icon: MessageSquare },
      { label: "Net Sentiment", value: "68.2%", change: "+4.1%", positive: true, icon: TrendingUp },
      { label: "Active Contributors", value: "12,840", change: "-2.4%", positive: false, icon: Users },
      { label: "Risk Alerts", value: "3", change: "-12", positive: true, icon: AlertTriangle }
    ]
  },
  "7d": {
    trendData: [
      { time: 'Mon', sentiment: 62, volume: 1500 },
      { time: 'Tue', sentiment: 68, volume: 1800 },
      { time: 'Wed', sentiment: 55, volume: 2200 },
      { time: 'Thu', sentiment: 70, volume: 1900 },
      { time: 'Fri', sentiment: 75, volume: 2400 },
      { time: 'Sat', sentiment: 80, volume: 1200 },
      { time: 'Sun', sentiment: 78, volume: 1100 },
    ],
    topicData: [
      { name: 'Feature Update', count: 18500 },
      { name: 'AI Safety', count: 14200 },
      { name: 'Customer Support', count: 12100 },
      { name: 'Market Shift', count: 9800 },
      { name: 'Pricing', count: 8500 },
    ],
    kpis: [
      { label: "Total Mentions", value: "342,105", change: "+18.2%", positive: true, icon: MessageSquare },
      { label: "Net Sentiment", value: "72.4%", change: "+6.8%", positive: true, icon: TrendingUp },
      { label: "Active Contributors", value: "48,220", change: "+5.1%", positive: true, icon: Users },
      { label: "Risk Alerts", value: "14", change: "-5", positive: true, icon: AlertTriangle }
    ]
  },
  "30d": {
    trendData: [
      { time: 'Week 1', sentiment: 60, volume: 8500 },
      { time: 'Week 2', sentiment: 65, volume: 12000 },
      { time: 'Week 3', sentiment: 72, volume: 15500 },
      { time: 'Week 4', sentiment: 68, volume: 14000 },
    ],
    topicData: [
      { name: 'Q3 Earnings', count: 65000 },
      { name: 'Feature Update', count: 54200 },
      { name: 'AI Safety', count: 42100 },
      { name: 'Customer Support', count: 38800 },
      { name: 'New Markets', count: 25500 },
    ],
    kpis: [
      { label: "Total Mentions", value: "1.4M", change: "+24.5%", positive: true, icon: MessageSquare },
      { label: "Net Sentiment", value: "70.1%", change: "+2.2%", positive: true, icon: TrendingUp },
      { label: "Active Contributors", value: "185,400", change: "+12.4%", positive: true, icon: Users },
      { label: "Risk Alerts", value: "45", change: "+8", positive: false, icon: AlertTriangle }
    ]
  }
};

const initialLiveFeed = [
  { id: 1, source: "Twitter", text: "Incredible new features from the product team. Game changer for our workflow.", sentiment: "Positive", time: new Date().toLocaleTimeString(), color: "text-emerald-400" },
  { id: 2, source: "Reddit", text: "Anyone else noticing latency issues since the last update?", sentiment: "Negative", time: new Date(Date.now() - 120000).toLocaleTimeString(), color: "text-rose-400" },
  { id: 3, source: "News API", text: "Tech sector sees unexpected growth in Q3 reporting.", sentiment: "Neutral", time: new Date(Date.now() - 900000).toLocaleTimeString(), color: "text-slate-400" },
  { id: 4, source: "LinkedIn", text: "Proud to announce our partnership with industry leaders today.", sentiment: "Positive", time: new Date(Date.now() - 3600000).toLocaleTimeString(), color: "text-emerald-400" }
];

const mockNewEvents = [
  { source: "Twitter", text: "Just tried the new Sentinel app, loving the UI!", sentiment: "Positive", color: "text-emerald-400" },
  { source: "HackerNews", text: "Show HN: Built a new real-time dashboard.", sentiment: "Neutral", color: "text-slate-400" },
  { source: "Reddit", text: "Servers are down again for maintenance without warning.", sentiment: "Negative", color: "text-rose-400" },
  { source: "LinkedIn", text: "Excited to join the SentinelAI team as a new engineer!", sentiment: "Positive", color: "text-emerald-400" },
  { source: "Twitter", text: "Can we get an API endpoint for the topic detection?", sentiment: "Neutral", color: "text-slate-400" }
];

export function useDashboardData(timeline: "24h" | "7d" | "30d") {
  const [feed, setFeed] = useState(initialLiveFeed);
  const [chartData, setChartData] = useState(timelines[timeline]);

  useEffect(() => {
    setChartData(timelines[timeline]);
  }, [timeline]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvent = mockNewEvents[Math.floor(Math.random() * mockNewEvents.length)];
      setFeed(prev => {
        const newFeed = [
          {
            id: Date.now(),
            ...randomEvent,
            time: new Date().toLocaleTimeString()
          },
          ...prev.slice(0, 3) // Keep top 4
        ];
        return newFeed;
      });

      // Update charts to simulate real-time live data
      setChartData(prev => {
        const newTrendData = prev.trendData.map(d => ({
          ...d,
          volume: Math.max(0, d.volume + Math.floor(Math.random() * 40 - 15)),
          sentiment: Math.max(0, Math.min(100, d.sentiment + Math.floor(Math.random() * 8 - 4)))
        }));
        
        const newTopicData = prev.topicData.map(t => ({
          ...t,
          count: Math.max(0, t.count + Math.floor(Math.random() * 120 - 40))
        }));
        
        const newKpis = prev.kpis.map(kpi => {
          let val = String(kpi.value);
          if (val.includes(',')) {
             const num = parseInt(val.replace(/,/g, ''), 10) + Math.floor(Math.random() * 15 - 3);
             val = num.toLocaleString();
          } else if (val.includes('%')) {
             const num = parseFloat(val) + (Math.random() * 0.4 - 0.2);
             val = num.toFixed(1) + '%';
          } else if (!val.includes('M') && !val.includes('K')) {
             const num = parseInt(val, 10) + Math.floor(Math.random() * 3 - 1);
             val = Math.max(0, num).toString();
          }
          return { ...kpi, value: val };
       });

        return {
          ...prev,
          trendData: newTrendData,
          topicData: newTopicData,
          kpis: newKpis
        };
      });
    }, 2500); // Add a new event every 2.5 seconds for interactive feel

    return () => clearInterval(interval);
  }, []);

  return { feed, chartData };
}
