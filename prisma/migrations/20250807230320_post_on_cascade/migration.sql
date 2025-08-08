-- DropForeignKey
ALTER TABLE "public"."Post" DROP CONSTRAINT "Post_UserID_fkey";

-- DropForeignKey
ALTER TABLE "public"."comment" DROP CONSTRAINT "comment_PostID_fkey";

-- AddForeignKey
ALTER TABLE "public"."Post" ADD CONSTRAINT "Post_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comment" ADD CONSTRAINT "comment_PostID_fkey" FOREIGN KEY ("PostID") REFERENCES "public"."Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
