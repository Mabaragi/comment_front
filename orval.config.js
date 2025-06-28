export const crawler = {
  output: {
    mode: 'split',
    target: 'src/api/endpoints.ts',
    schemas: 'src/api/schemas',
    client: 'react-query',
    override: {
      mutator: {
        path: './src/api/axiosInstance.ts',
        name: 'axiosInstance',
      },
    },
  },
  input: {
    target: './openapi.json', // 로컬 파일 경로
  },
};
