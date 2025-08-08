-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_UserID_fkey";

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
