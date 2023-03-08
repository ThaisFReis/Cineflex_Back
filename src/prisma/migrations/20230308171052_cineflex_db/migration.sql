-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "email" VARCHAR(255),
    "password" VARCHAR(255),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255),
    "poster" VARCHAR(255),

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale" (
    "id" SERIAL NOT NULL,
    "sessionid" INTEGER,
    "seatid" INTEGER,
    "userid" INTEGER,
    "price" DOUBLE PRECISION,
    "tickettype" VARCHAR(255),
    "documenttype" VARCHAR(255),
    "documentnumber" VARCHAR(255),

    CONSTRAINT "sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" SERIAL NOT NULL,
    "sessionid" INTEGER,
    "rowseats" INTEGER,
    "columnseats" INTEGER,
    "status" VARCHAR(255) DEFAULT 'available',
    "seatid" INTEGER,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "session" (
    "id" SERIAL NOT NULL,
    "movieid" INTEGER,
    "time" TIMESTAMP(6),

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "seat_seatid_key" ON "seat"("seatid");

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "fk_sale_seat" FOREIGN KEY ("seatid") REFERENCES "seat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "fk_sale_session" FOREIGN KEY ("sessionid") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale" ADD CONSTRAINT "fk_sale_user" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "fk_seat_session" FOREIGN KEY ("sessionid") REFERENCES "session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "fk_session_movie" FOREIGN KEY ("movieid") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
