import { Request, Response } from "express";
import cheerio from "cheerio";
import { api } from "../axios";
import { parseSrcSet } from "../utils";

export const getPost = async (req: Request, res: Response) => {
  try {
    const { year, month, title } = req.params;
    const link = `/${year}/${month}/${title}`;
    const { data } = await api(link);
    const $ = cheerio.load(data);
    const images = [];
    const latest = [];
    const trending = [];
    const related = [];

    $("article .post img").each((i, el) => {
      images.push(el.attribs["src"]);
    });
    $("#featpost1 .Image .widget-content").each((i, el) => {
      latest.push({
        src: $(el).find("img").attr("src"),
        srcset: parseSrcSet($(el).find("img").attr("srcset") || ""),
        title: $(el).find(".caption").text(),
        link: $(el).find("a").attr("href").slice(28),
      });
    });
    $("#HTML1 a").each((i, el) => {
      trending.push({
        src: $(el).find("img").attr("src"),
        title: $(el).find("h3").text(),
        link: el.attribs["href"].slice(28),
      });
    });
    $("#HTML13 a").each((i, el) => {
      related.push({
        src: $(el).find("img").attr("src"),
        title: $(el).find("h3").text(),
        link: el.attribs["href"].slice(28),
      });
    });
    res.send({
      link,
      totalImages: images.length,
      json: JSON.parse($("article .post script").text()),
      images,
      latest,
      trending,
      related,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      error,
      message: "Internal server error",
    });
  }
};
