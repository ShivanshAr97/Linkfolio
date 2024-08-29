import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/Forms/PageButtonsForm";
import PageLinksForm from "@/components/Forms/PageLinksForm";
import PageSettingsForm from "@/components/Forms/PageSettingForm";
import UsernameForm from "@/components/Forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import cloneDeep from "clone-deep";
import { redirect } from "next/navigation";

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if (!session) {
    return redirect("/");
  }
  mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session?.user?.email });

  // console.log(page);

  // const leanPage = cloneDeep(page.toJSON());
  // leanPage._id = leanPage._id.toString();
  if (page) {
    return (
      <div>
        <PageSettingsForm page={page} user={session.user} />
        <PageButtonsForm page={page} user={session.user} />
        <PageLinksForm page={page} user={session.user} />
      </div>
    );
  }

  return <UsernameForm desiredUsername={desiredUsername} />;
}
