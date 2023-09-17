--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: usernames; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.usernames (
    username character varying(25) NOT NULL,
    games_played integer DEFAULT 1 NOT NULL,
    best_game integer DEFAULT 1000
);


ALTER TABLE public.usernames OWNER TO freecodecamp;

--
-- Data for Name: usernames; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.usernames VALUES ('user_1683335516847', 1, 195);
INSERT INTO public.usernames VALUES ('user_1683335525701', 1, 561);
INSERT INTO public.usernames VALUES ('user_1683335553020', 1, 230);
INSERT INTO public.usernames VALUES ('user_1683335563673', 1, 56);
INSERT INTO public.usernames VALUES ('user_1683335516846', 1, 732);
INSERT INTO public.usernames VALUES ('user_1683335535938', 1, 494);
INSERT INTO public.usernames VALUES ('user_1683335553019', 1, 513);
INSERT INTO public.usernames VALUES ('user_1683335525702', 1, 195);
INSERT INTO public.usernames VALUES ('user_1683335535937', 1, 835);
INSERT INTO public.usernames VALUES ('user_1683335563674', 1, 115);


--
-- Name: usernames usernames_pkey; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.usernames
    ADD CONSTRAINT usernames_pkey PRIMARY KEY (username);


--
-- PostgreSQL database dump complete
--