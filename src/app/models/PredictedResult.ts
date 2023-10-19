export interface PredictedResult {
    response: {
      glioma: number;
      meningioma: number;
      no_tumor: number;
      pituitary: number;
    };
}
