-- CreateTable
CREATE TABLE "CompanyPage" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "logo" TEXT,
    "coverImage" TEXT,
    "primaryColor" TEXT NOT NULL DEFAULT '#6366f1',
    "accentColor" TEXT NOT NULL DEFAULT '#3b82f6',
    "whatsapp" TEXT,
    "instagram" TEXT,
    "facebook" TEXT,
    "address" TEXT,
    "showServices" BOOLEAN NOT NULL DEFAULT true,
    "showTestimonials" BOOLEAN NOT NULL DEFAULT true,
    "showAbout" BOOLEAN NOT NULL DEFAULT true,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CompanyPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageTestimonial" (
    "id" TEXT NOT NULL,
    "companyPageId" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "authorAvatar" TEXT,
    "rating" INTEGER NOT NULL DEFAULT 5,
    "text" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageTestimonial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPage_companyId_key" ON "CompanyPage"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyPage_slug_key" ON "CompanyPage"("slug");

-- AddForeignKey
ALTER TABLE "CompanyPage" ADD CONSTRAINT "CompanyPage_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageTestimonial" ADD CONSTRAINT "PageTestimonial_companyPageId_fkey" FOREIGN KEY ("companyPageId") REFERENCES "CompanyPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
