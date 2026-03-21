import api from "./api";
import type {
  IngestResponse,
  IngestionStatusResponse,
  DocumentResponse,
} from "@/types";

export const ingestionApi = {
  ingest: (
    type: string = "pages",
    ids?: number[],
    force: boolean = false
  ) =>
    api
      .post<IngestResponse>("/ingestion/ingest", {
        bookstack_type: type,
        bookstack_ids: ids ?? null,
        force_reindex: force,
      })
      .then((r) => r.data),

  getStatus: (taskId: string) =>
    api
      .get<IngestionStatusResponse>(`/ingestion/status/${taskId}`)
      .then((r) => r.data),

  getDocuments: (
    page: number = 1,
    pageSize: number = 20,
    status?: string
  ) =>
    api
      .get<DocumentResponse[]>("/ingestion/documents", {
        params: { page, page_size: pageSize, ...(status ? { status } : {}) },
      })
      .then((r) => r.data),
};
