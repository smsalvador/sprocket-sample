import { MigrationInterface, QueryRunner } from "typeorm";

export class Schemas1693088747913 implements MigrationInterface {
    name = 'Schemas1693088747913'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.startTransaction();
        await queryRunner.query(`
            CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        `);
        await queryRunner.commitTransaction();
        await queryRunner.startTransaction();
        await queryRunner.query(`
            CREATE TABLE "sprocket_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP NOT NULL DEFAULT now(),
                "teeth" integer NOT NULL,
                "pitch_diameter" double precision NOT NULL,
                "outside_diameter" double precision NOT NULL,
                "pitch" double precision NOT NULL,
                "description" text NOT NULL,
                "is_active" boolean NOT NULL,
                CONSTRAINT "PK_03abfb48be83f6f2a93d044ba09" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sprocket_factory_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "description" text NOT NULL,
                "is_active" boolean NOT NULL,
                CONSTRAINT "PK_a40a60dbc68211cfe7930262b51" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "sprocket_factory_production_entity" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "createAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updateAt" TIMESTAMP NOT NULL DEFAULT now(),
                "production_actual" integer NOT NULL,
                "production_goal" integer NOT NULL,
                "factoryId" uuid,
                "sprocketId" uuid,
                CONSTRAINT "PK_40bbc92c9a23778e64480158ee2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "sprocket_factory_production_entity"
            ADD CONSTRAINT "FK_b06addd6d1f6a66fd396358d8c7" FOREIGN KEY ("factoryId") REFERENCES "sprocket_factory_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "sprocket_factory_production_entity"
            ADD CONSTRAINT "FK_5e4bdefe79ad86034b85dcf6618" FOREIGN KEY ("sprocketId") REFERENCES "sprocket_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.commitTransaction();
        await queryRunner.query(`
            INSERT INTO public.sprocket_entity ("id","createAt","updateAt","teeth","pitch_diameter","outside_diameter","pitch","description","is_active") VALUES
                ('00d44549-f600-4b0f-9a32-66aa8d281d3d','2023-08-24 12:18:15.119-05','2023-08-24 12:18:15.119-05',5,5.00,6.00,1.00,'',true),
                ('10d8e09b-77dd-462d-819f-48fb5ab23634','2023-08-24 12:43:49.268-05','2023-08-24 12:43:49.268-05',5,5.50,6.50,1.50,'',true),
                ('5d7af4f5-8303-480f-b764-2886b69411fb','2023-08-24 12:48:55.856-05','2023-08-24 12:48:55.856-05',8,10.00,12.00,1.50,'Sprocket prototype',false),
                ('b56a545e-28e4-4891-a67d-86dc04a10a27','2023-08-24 12:44:03.474-05','2023-08-24 12:46:56.58-05',5,5.80,6.80,1.80,'',true),
                ('e6765bc0-e2ef-44c1-9557-cb00b15fe33c','2023-08-24 12:48:12.038-05','2023-08-24 12:48:12.038-05',6,6.70,7.50,1.20,'',true)
            ON CONFLICT DO NOTHING;

            INSERT INTO public.sprocket_factory_entity ("id","createAt","updateAt","name","description","is_active") VALUES
                ('10a40942-1671-4607-aa99-4fbf8c9eefcd','2023-08-24 12:49:39.835-05','2023-08-24 12:49:39.835-05','West Coast Sprocket Factory','',true),
                ('3575c883-b97a-49c9-8d40-757c40fd2eb4','2023-08-24 12:49:23.998-05','2023-08-24 12:49:23.998-05','East Coast Sprocket Factory','',true),
                ('36aa83de-7bd7-4343-8882-7a30473311f1','2023-08-24 12:50:13.426-05','2023-08-24 12:50:13.426-05','South-America Sprocket Factory','',false)
            ON CONFLICT DO NOTHING;

            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('0260c22f-f579-4abe-bf6b-9c1c9b890d2b','2023-08-01 07:04:00-05','2023-08-01 07:04:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('027a76a3-09dc-4f12-bea2-84bd2c3c7c16','2023-08-01 07:16:00-05','2023-08-01 07:16:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('034f621a-1b85-4525-91ae-075839c539d4','2023-08-01 07:05:00-05','2023-08-01 07:05:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('03b64d50-8b02-4bdc-a0d6-e70752a90644','2023-08-01 07:01:00-05','2023-08-01 07:01:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('079946f6-9ebf-418e-8763-9c1ca2cf088b','2023-08-01 07:10:00-05','2023-08-01 07:10:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('0a987dd9-f128-4e99-9e5a-f6d2a20f1871','2023-08-01 07:00:00-05','2023-08-01 07:00:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('0cf6e48f-b60d-4971-843f-935e65736986','2023-08-01 07:12:00-05','2023-08-01 07:12:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('0fbadaef-b281-4644-9585-331b5df3fe18','2023-08-01 07:17:00-05','2023-08-01 07:17:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('10ffa51d-7981-4805-ad9d-32d6147e0a6e','2023-08-01 07:03:00-05','2023-08-01 07:03:00-05',30,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('1244c7e2-5e71-4b55-a2e9-0f16992c0ad6','2023-08-01 07:02:00-05','2023-08-01 07:02:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('12fd8346-cd91-4562-991b-c5f78398a471','2023-08-01 07:24:00-05','2023-08-01 07:24:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('1493d8d4-6578-47f1-82df-88a0eedc13a2','2023-08-01 07:24:00-05','2023-08-01 07:24:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('18e0a254-5fee-4b1b-ad59-33f8f2896fbd','2023-08-01 07:02:00-05','2023-08-01 07:02:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('19433ba7-8825-413d-a31d-c881578fc7df','2023-08-01 07:21:00-05','2023-08-01 07:21:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('1ae35092-6200-42ef-a9d2-f913a52578af','2023-08-01 07:27:00-05','2023-08-01 07:27:00-05',31,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('1d4d7d5c-7f15-4b37-b48b-2e2d80d40fe7','2023-08-01 07:28:00-05','2023-08-01 07:28:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('1d997c2b-1e46-4192-b31c-7c9e424a2512','2023-08-01 07:03:00-05','2023-08-01 07:03:00-05',30,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('1e8c5a85-6669-4653-9801-26f06856289b','2023-08-01 07:04:00-05','2023-08-01 07:04:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('223ca4aa-a569-48e7-add8-df3dedca62ae','2023-08-01 07:10:00-05','2023-08-01 07:10:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('2339bb95-237d-4526-9ac5-288f9abc2cf6','2023-08-01 07:13:00-05','2023-08-01 07:13:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('2354c5d1-80f3-4c82-bebf-b7bbcdbce677','2023-08-01 07:20:00-05','2023-08-01 07:20:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('2af87e54-e8d5-417f-a0ce-c958f7ed1fbd','2023-08-01 07:28:00-05','2023-08-01 07:28:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('2ee0e475-13e3-4a76-91b8-97d5989840a7','2023-08-01 07:22:00-05','2023-08-01 07:22:00-05',29,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('31b968dc-c0c1-46ef-be5a-f2f1a72a3091','2023-08-01 07:20:00-05','2023-08-01 07:20:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('326f8384-3bf0-4ac4-8b06-efe7281985bc','2023-08-01 07:26:00-05','2023-08-01 07:26:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('3385ba42-d6b2-42e7-ab5f-53fcc6c7d801','2023-08-01 07:08:00-05','2023-08-01 07:08:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('3755500b-2ed2-4b08-a459-0fbe1722ba0e','2023-08-01 07:27:00-05','2023-08-01 07:27:00-05',31,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('3b435e03-aa1f-4700-9376-e015e3134dd8','2023-08-01 07:06:00-05','2023-08-01 07:06:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('3c516c3e-b4c4-4468-b408-fc0ce5dfdb5b','2023-08-01 07:19:00-05','2023-08-01 07:19:00-05',31,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('3f147c9c-1323-4fd0-af89-fe3099fb4b03','2023-08-01 07:07:00-05','2023-08-01 07:07:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('3f24c656-fda0-4402-9b04-7ee4deeb5982','2023-08-01 07:05:00-05','2023-08-01 07:05:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('4158664f-d6d1-4871-9b0b-acd91cf7a2a5','2023-08-01 07:16:00-05','2023-08-01 07:16:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('42e3bbbf-afe9-461a-88af-50d87861e6ca','2023-08-01 07:15:00-05','2023-08-01 07:15:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('45fc1340-3a1f-45c9-bbc0-2b5d46c322bd','2023-08-01 07:27:00-05','2023-08-01 07:27:00-05',31,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('4a5bd1dc-068b-4fd3-9d2a-ec7c3e3593f1','2023-08-01 07:17:00-05','2023-08-01 07:17:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('4b6345c1-56c7-4286-9cb7-d65f7c4442ae','2023-08-01 07:02:00-05','2023-08-01 07:02:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('4d676ad5-b342-4674-bcdf-be45c7e53bd1','2023-08-01 07:16:00-05','2023-08-01 07:16:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('4fafd3f2-189d-4bbd-b965-4dc50a1d556e','2023-08-01 07:21:00-05','2023-08-01 07:21:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('4ffb1d5e-47ba-4a97-a739-54199d1e8bf3','2023-08-01 07:01:00-05','2023-08-01 07:01:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('51656ad7-7161-486a-94d0-4e83861fbebd','2023-08-01 07:11:00-05','2023-08-01 07:11:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('543f4fff-d334-440e-ba9e-da4edabe3a07','2023-08-01 07:05:00-05','2023-08-01 07:05:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('562f7fce-da35-4c34-aae2-bfbe2ad2c43d','2023-08-01 07:23:00-05','2023-08-01 07:23:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('57685aeb-f29e-475c-a2fb-e7267f5c8987','2023-08-01 07:12:00-05','2023-08-01 07:12:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('58f30100-b91e-4b07-bc72-8c052c56d9bd','2023-08-01 07:22:00-05','2023-08-01 07:22:00-05',29,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('5d83527e-bd20-4a69-b7c7-bf95c26491a4','2023-08-01 07:03:00-05','2023-08-01 07:03:00-05',30,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('610beab6-88f0-4bb1-b262-5b221cf3c6e2','2023-08-01 07:19:00-05','2023-08-01 07:19:00-05',31,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('627f4886-d985-480a-b199-1bd100334aa4','2023-08-01 07:24:00-05','2023-08-01 07:24:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('6297db19-04da-421a-9d31-d62bd38009df','2023-08-01 07:07:00-05','2023-08-01 07:07:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('68afb788-ba36-4ec6-8990-485fc46fc103','2023-08-01 07:29:00-05','2023-08-01 07:29:00-05',29,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('6a6a1931-75b2-4f40-bb8a-cecb0d74de87','2023-08-01 07:29:00-05','2023-08-01 07:29:00-05',29,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('6b729b54-e135-41ff-90cd-21bba862d797','2023-08-01 07:29:00-05','2023-08-01 07:29:00-05',29,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('6d2180c9-48b1-47d1-82c9-b404f388466f','2023-08-01 07:19:00-05','2023-08-01 07:19:00-05',31,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('6f50b509-b2ae-4c28-878f-840d8b84b4b8','2023-08-01 07:26:00-05','2023-08-01 07:26:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('7549fad7-182e-4280-a328-3ec7dcd4d4be','2023-08-01 07:25:00-05','2023-08-01 07:25:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('7560d057-af79-4349-9808-92b81bee80b0','2023-08-01 07:09:00-05','2023-08-01 07:09:00-05',31,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('7582253e-c65e-4026-90ff-b335e2cec3a9','2023-08-01 07:12:00-05','2023-08-01 07:12:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('7bbc8aec-5047-4484-a01d-c7d9b75936a8','2023-08-01 07:04:00-05','2023-08-01 07:04:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('7de449bf-125b-4479-8a09-a2f13d766f81','2023-08-01 07:23:00-05','2023-08-01 07:23:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('80026369-9b9d-449a-a651-9b681a0f8c95','2023-08-01 07:00:00-05','2023-08-01 07:00:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('805be9eb-eace-42fd-96f9-5a9931526e88','2023-08-01 07:21:00-05','2023-08-01 07:21:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('83fc9c84-6a3e-4b2b-b75a-dd5e160e4926','2023-08-01 07:28:00-05','2023-08-01 07:28:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('85170364-fcec-417b-a742-38746cb98b50','2023-08-01 07:06:00-05','2023-08-01 07:06:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('85998695-620b-4261-9c1b-36e286c50ef5','2023-08-01 07:10:00-05','2023-08-01 07:10:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('86b09a7f-e621-4560-8860-e2762beb6f10','2023-08-01 07:25:00-05','2023-08-01 07:25:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('86e4daf5-c1f9-4072-8644-c4b78452cd5c','2023-08-01 07:14:00-05','2023-08-01 07:14:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('8b757aa0-c96f-4422-ba29-ca17bb3b187f','2023-08-01 07:00:00-05','2023-08-01 07:00:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('8bab6168-4066-4c38-bcbc-0c25c9306e29','2023-08-01 07:09:00-05','2023-08-01 07:09:00-05',31,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('8c0ee1dd-fe22-44e8-be26-7f6c7b1da383','2023-08-01 07:14:00-05','2023-08-01 07:14:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('8d2734ee-c0cf-49ca-afff-515498f2decd','2023-08-01 07:11:00-05','2023-08-01 07:11:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('8d836619-074e-49dd-be7b-571bc8615189','2023-08-01 07:15:00-05','2023-08-01 07:15:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('8e59af62-94ca-42f7-ae0f-70168755a24c','2023-08-01 07:23:00-05','2023-08-01 07:23:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('90c8c218-dca7-4fb7-a990-fb5b334a959c','2023-08-01 07:26:00-05','2023-08-01 07:26:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('91e400aa-f9c7-4154-b499-6be473c9aae7','2023-08-01 07:24:00-05','2023-08-01 07:24:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('928e676a-5f44-46dd-9d90-0baf3928f7f8','2023-08-01 07:18:00-05','2023-08-01 07:18:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('93830385-afab-4e0e-8993-0474807e7477','2023-08-01 07:27:00-05','2023-08-01 07:27:00-05',31,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('93effc4d-681a-4353-95b3-6a58712abbdb','2023-08-01 07:18:00-05','2023-08-01 07:18:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('97dcf3a3-5f94-465c-9e77-de7582f16769','2023-08-01 07:06:00-05','2023-08-01 07:06:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('99771a0c-7205-4f65-8db0-011603804ba2','2023-08-01 07:17:00-05','2023-08-01 07:17:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('9ef6365c-c609-43dc-a0be-8355e0a053eb','2023-08-01 07:22:00-05','2023-08-01 07:22:00-05',29,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('a7c6bc9e-fed1-4706-8b8a-3aa3a3a76829','2023-08-01 07:11:00-05','2023-08-01 07:11:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('a8c906ae-8807-44c5-957e-29f1f945685f','2023-08-01 07:28:00-05','2023-08-01 07:28:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('a92b1bba-78bb-4d6d-be16-ca3e05c02fac','2023-08-01 07:20:00-05','2023-08-01 07:20:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('aa3a2077-ff6b-4459-8134-3c0f46dfda28','2023-08-01 07:13:00-05','2023-08-01 07:13:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('b401970f-6fcb-4802-ac58-a15def7b0e28','2023-08-01 07:11:00-05','2023-08-01 07:11:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('b4b28816-3f5c-464d-807f-57393c15d135','2023-08-01 07:25:00-05','2023-08-01 07:25:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('b662ef02-b5e6-4d0a-b37b-df40534dc15b','2023-08-01 07:23:00-05','2023-08-01 07:23:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('b851ffd5-8fcc-49cb-a285-de4bf9880370','2023-08-01 07:20:00-05','2023-08-01 07:20:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('b8b9abd1-4e0b-4078-a8f2-c6911fea39e9','2023-08-01 07:25:00-05','2023-08-01 07:25:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('ba67412b-c1fe-4c1f-a79a-7b183407a8aa','2023-08-01 07:16:00-05','2023-08-01 07:16:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('bf253797-439b-4b78-adb8-9879321fd5ab','2023-08-01 07:07:00-05','2023-08-01 07:07:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('bfcb9373-6b2c-409f-a035-bdf20a924fc7','2023-08-01 07:13:00-05','2023-08-01 07:13:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('bfcc926b-781d-43bb-b20d-67079e77e95b','2023-08-01 07:06:00-05','2023-08-01 07:06:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('c225783e-b4ef-4bd5-b332-c5f775a03194','2023-08-01 07:02:00-05','2023-08-01 07:02:00-05',31,31,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('c386cde1-348a-4d0c-8226-b49fb06b48f6','2023-08-01 07:14:00-05','2023-08-01 07:14:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('c60d28d2-daa2-42de-895b-60bda37cf7ed','2023-08-01 07:08:00-05','2023-08-01 07:08:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('c6a73bc4-96b4-4bc1-a719-cf5f01aa006a','2023-08-01 07:04:00-05','2023-08-01 07:04:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','00d44549-f600-4b0f-9a32-66aa8d281d3d'),
                ('c79bc6a4-e8d6-4d64-8521-7a1e935a3229','2023-08-01 07:29:00-05','2023-08-01 07:29:00-05',29,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('c8aa203d-6534-4b7a-b0da-317474d7c030','2023-08-01 07:12:00-05','2023-08-01 07:12:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('c9462885-937b-4796-9066-e4fd094da460','2023-08-01 07:03:00-05','2023-08-01 07:03:00-05',30,29,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('c9a3f45f-0d6d-4c23-b31f-5cf9e49ee8b8','2023-08-01 07:19:00-05','2023-08-01 07:19:00-05',31,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('cb2c70ad-f36c-42ff-8bfb-19fdfd80cc67','2023-08-01 07:21:00-05','2023-08-01 07:21:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('d2d39517-c7cc-4c52-b8dd-cba230290702','2023-08-01 07:05:00-05','2023-08-01 07:05:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('d389f624-b284-4451-a69e-49d34e7f98d2','2023-08-01 07:08:00-05','2023-08-01 07:08:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('d444dd69-c667-4ea2-9589-c88fb528001d','2023-08-01 07:17:00-05','2023-08-01 07:17:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('d5437e67-0949-4ba9-985c-7282b66d8272','2023-08-01 07:15:00-05','2023-08-01 07:15:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('d96fafb3-7511-48bf-bc95-029ab04c63c2','2023-08-01 07:01:00-05','2023-08-01 07:01:00-05',29,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('db83447c-89ef-4aa4-86cf-d84334e8ad4f','2023-08-01 07:18:00-05','2023-08-01 07:18:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('ddabd48a-fbbe-4dd5-9c21-73eeba1c01f1','2023-08-01 07:14:00-05','2023-08-01 07:14:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('e1c18358-528f-47ab-9ed6-4f6b4626f1aa','2023-08-01 07:13:00-05','2023-08-01 07:13:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('e3b92a03-5442-4835-a4d4-788862e3f5bc','2023-08-01 07:01:00-05','2023-08-01 07:01:00-05',29,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
            INSERT INTO public.sprocket_factory_production_entity ("id","createAt","updateAt","production_actual","production_goal","factoryId","sprocketId") VALUES
                ('e60d09fb-c91d-4895-9476-0d42cc157b24','2023-08-01 07:07:00-05','2023-08-01 07:07:00-05',31,31,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('e66bf7ea-4dc8-462d-bde6-3260b50370d1','2023-08-01 07:26:00-05','2023-08-01 07:26:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('e895cd32-454c-48e5-a3fd-03ded6d01a2d','2023-08-01 07:08:00-05','2023-08-01 07:08:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('edf655a1-b708-4091-bf91-c9ee0978bbf6','2023-08-01 07:22:00-05','2023-08-01 07:22:00-05',29,29,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('ee6bc9cc-e719-4573-8089-379ed5c94adc','2023-08-01 07:00:00-05','2023-08-01 07:00:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('f4d0cafe-a3a3-4276-9502-93735b995153','2023-08-01 07:18:00-05','2023-08-01 07:18:00-05',32,32,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('f78f67cb-3af9-4f03-8c57-b9992c32907a','2023-08-01 07:15:00-05','2023-08-01 07:15:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('f7ae983a-2da9-4b7b-a566-922bdbe8fe8a','2023-08-01 07:09:00-05','2023-08-01 07:09:00-05',31,30,'10a40942-1671-4607-aa99-4fbf8c9eefcd','10d8e09b-77dd-462d-819f-48fb5ab23634'),
                ('f8c12080-3e4f-4698-a86c-f87979511aa4','2023-08-01 07:10:00-05','2023-08-01 07:10:00-05',32,32,'10a40942-1671-4607-aa99-4fbf8c9eefcd','b56a545e-28e4-4891-a67d-86dc04a10a27'),
                ('fff5702b-7712-40de-815d-a71be4845fd4','2023-08-01 07:09:00-05','2023-08-01 07:09:00-05',31,30,'3575c883-b97a-49c9-8d40-757c40fd2eb4','10d8e09b-77dd-462d-819f-48fb5ab23634')
            ON CONFLICT DO NOTHING;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "sprocket_factory_production_entity" DROP CONSTRAINT "FK_5e4bdefe79ad86034b85dcf6618"
        `);
        await queryRunner.query(`
            ALTER TABLE "sprocket_factory_production_entity" DROP CONSTRAINT "FK_b06addd6d1f6a66fd396358d8c7"
        `);
        await queryRunner.query(`
            DROP TABLE "sprocket_factory_production_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "sprocket_factory_entity"
        `);
        await queryRunner.query(`
            DROP TABLE "sprocket_entity"
        `);
    }

}
