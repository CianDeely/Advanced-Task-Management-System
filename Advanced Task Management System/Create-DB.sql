if db_id('tempdb') IS NULL
     CREATE DATABASE tempdb;
GO

-- Table: MyTasks
CREATE TABLE tempdb.dbo.MyTasks (
����Id int��NOT NULL IDENTITY(1, 1),
����Title varchar(50)��NOT NULL,
����Description varchar(MAX),
����Priority int��NOT NULL,
    Due_Date datetime NOT NULL,
    Status int��NOT NULL,
����CONSTRAINT MyTasks_pk PRIMARY KEY��(id)
);