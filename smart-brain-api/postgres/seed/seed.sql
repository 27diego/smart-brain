BEGIN TRANSACTION;

INSERT into users
    ( name, email, entries, joined )
values
    ('a', 'a@a.com', 5, '2018-01-01');

INSERT into login
    ( hash, email )
values
    ('$2a$10$WAK21U0LQl7c//jJ.DOB2uPP1DJQh7KUDfgasdyQeGzkop2Pzl8W7u', 'a@a.com');