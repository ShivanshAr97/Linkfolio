import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { differenceInDays, formatISO9075, isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });
  // console.log(page);
  const groupedViews = await Event.find({ uri: page.uri });
  // console.log(groupedViews);

  const a = groupedViews.map((view) => ({
    _id: view.date,
    count: view.count,
  }));

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });
  const b = clicks.map((view) => ({
    _id: view.date,
    count: view.count,
    uri: view.uri,
  }));

  console.log(b);

  return (
    <div>
      <div className=" pb-4 m-6">
        <h2 className="text-2xl my-6 font-semibold text-center">Views</h2>
        <Chart
          data={a.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </div>
      <div className="border-2"></div>
      <div>
        <h2 className="text-2xl my-6 font-semibold text-center">Clicks</h2>
        {page.links.map((link) => (
          <div
            key={link.title}
            className="md:flex gap-4 mx-8 items-center border-y border-gray-200 py-4"
          >
            <div className="grow  font-semibold">
              <h3>{link.title || "no title"}</h3>
              <a
                className="text-xs text-blue-400"
                target="_blank"
                href="link.url"
              >
                {link.url}
              </a>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {b.filter(
                      (c) => c.uri === link.key && isToday(new Date(c._id))
                    )
                    .reduce((total, current) => total + current.count, 0)}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">
                  clicks today
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="border rounded-md p-2 mt-1 md:mt-0">
                <div className="text-3xl">
                  {b.filter(
                      (c) => c.uri === link.key
                    )
                    .reduce((total, current) => total + current.count, 0)}
                </div>
                <div className="text-gray-400 text-xs uppercase font-bold">
                  clicks total
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
