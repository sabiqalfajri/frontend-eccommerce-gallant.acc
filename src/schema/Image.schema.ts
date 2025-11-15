import { z } from "zod";

const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg", 'image/webp'];

export const ImageUploadSchema = z
    .instanceof(FileList)
    .refine((files) => files.length <= 2, {
      message: "Maksimal 2 gambar.",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_FILE_TYPES.includes(file.type)
        ),
      {
        message: "Hanya format JPG, JPEG, dan PNG yang diperbolehkan.",
      }
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "Ukuran maksimal per gambar adalah 3MB.",
      }
    );

export const ImageUploadSingleSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 3MB",
    })
    .refine((file) => ["image/jpeg", "image/png", "image/jpg"].includes(file.type), {
      message: "Only JPEG/PNG/JPG files are allowed",
    });

export const ImageProductUploadSchema = z
    .instanceof(FileList)
    .refine((files) => files.length <= 2, {
      message: "Maksimal 2 gambar.",
    })
    .refine(
      (files) =>
        Array.from(files).every((file) =>
          ALLOWED_FILE_TYPES.includes(file.type)
        ),
      {
        message: "Only JPEG/PNG/JPG files are allowed.",
      }
    )
    .refine(
      (files) => Array.from(files).every((file) => file.size <= MAX_FILE_SIZE),
      {
        message: "Max file size is 3MB",
      }
    );