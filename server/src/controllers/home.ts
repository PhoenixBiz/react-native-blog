import { Request, Response } from "express";
import cheerio from "cheerio";
import { api } from "../axios";

export const getHome = async (req: Request, res: Response) => {
  try {
    const { data } = await api("");
    const $ = cheerio.load(data);
    const json = [];
    const popular = [];
    $("article .post").each((i, el) => {
      json.push(JSON.parse($(el).find("script").text()));
    });
    $("#HTML6 a").each((i, el) => {
      popular.push({
        src: $(el).find("img").attr("src"),
        title: $(el).find("h3").text(),
        link: el.attribs["href"].slice(28),
      });
    });
    res.send({
      total: json.length,
      posts: json,
      popular,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
};
