export const crawler = {
  output: {
    mode: 'split',
    target: './src/api/generated.ts',
    client: 'react-query',
    baseUrl: 'http://localhost:8000',
    override: {
      mutator: {
        path: './src/api/index.ts',
        name: 'axiosInstance',
      },
    },
  },
  input: {
    target: './openapi.json', // 로컬 파일 경로
  },
};
