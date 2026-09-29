INSERT INTO "categories" ("name")
VALUES
    ('Food'),
    ('Travel'),
    ('Shopping'),
    ('Bills'),
    ('Other')
    ON CONFLICT ("name") DO NOTHING;-- Custom SQL migration file, put your code below! --