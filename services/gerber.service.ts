import { apiRequest } from "./api-client";

export const GerberService = {
  uploadFiles: (files: File[], quoteId?: string) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    if (quoteId) {
      formData.append("quoteId", quoteId);
    }

    return apiRequest("/gerber-files/upload", {
      method: "POST",
      body: formData,
    });
  },

  getMyFiles: () => apiRequest("/gerber-files/my"),

  getAllFiles: () => apiRequest("/gerber-files"),

  getFileById: (gerberId: string) => apiRequest(`/gerber-files/${gerberId}`),

  reviewFile: (gerberId: string, payload: { status: "REVIEWING" | "APPROVED" | "REJECTED"; message?: string }) =>
    apiRequest(`/gerber-files/${gerberId}/review`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  deleteFile: (gerberId: string) =>
    apiRequest(`/gerber-files/${gerberId}`, {
      method: "DELETE",
    }),
};
