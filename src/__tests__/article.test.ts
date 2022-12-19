import { faker } from '@faker-js/faker';
const axios = require('axios');

let DummyArticle: { title: string; content: string; nickname: string } = { title: '', content: '', nickname: '' };
let DummyComment: { comment: string; nickname: string } = { comment: '', nickname: '' };
let articleId = '';
let commentId = '';

export function dummyArticle() {
  return {
    nickname: faker.name.fullName(),
    title: faker.lorem.words(4),
    content: faker.lorem.words(10),
  };
}

export function dummyComment() {
  return {
    nickname: faker.name.fullName(),
    comment: faker.lorem.words(5),
  };
}
const BASE_PATH = 'http://localhost:3000';

describe('POST /v1/article', () => {
  beforeAll(() => {
    DummyArticle = dummyArticle();
  });

  const exec = async () => {
    return new Promise(async (resolve) => {
      try {
        const data = JSON.stringify(DummyArticle);
        const config = {
          method: 'post',
          url: `${BASE_PATH}/v1/article/`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        const res = await axios(config);
        return resolve(res.data);
      } catch (e: any) {
        if (e.isAxiosError) {
          return resolve(e.response.data);
        }

        return resolve(e);
      }
    });
  };

  it('should return 200 with code `SUCCESS` if all fields are valid', async () => {
    const response: any = await exec();

    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('SUCCESS');
  });
});

describe('GET /v1/article', () => {
  const exec = async () => {
    return new Promise(async (resolve) => {
      try {
        const config = {
          method: 'get',
          url: `${BASE_PATH}/v1/article/`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await axios(config);
        return resolve(res.data);
      } catch (e: any) {
        if (e.isAxiosError) {
          return resolve(e.response.data);
        }

        return resolve(e);
      }
    });
  };

  it('should return 200 with code `SUCCESS` if all fields are valid', async () => {
    const response: any = await exec();
    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('SUCCESS');
    expect(response.data.totalCount).toBeGreaterThan(0);
    articleId = response.data.article[0].id;
  });
});

describe('POST /v1/comment/:articleId', () => {
  beforeAll(() => {
    DummyComment = dummyComment();
  });

  const exec = async () => {
    return new Promise(async (resolve) => {
      try {
        var data = JSON.stringify(DummyComment);
        const config = {
          method: 'post',
          url: `${BASE_PATH}/v1/comment/${articleId}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        const res = await axios(config);
        return resolve(res.data);
      } catch (e: any) {
        if (e.isAxiosError) {
          return resolve(e.response.data);
        }

        return resolve(e);
      }
    });
  };

  it('should return 200 with code `SUCCESS` if all fields are valid', async () => {
    const response: any = await exec();
    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('SUCCESS');
  });
});

describe('GET /v1/comment/:articleId', () => {
  const exec = async () => {
    return new Promise(async (resolve) => {
      try {
        const config = {
          method: 'get',
          url: `${BASE_PATH}/v1/comment/${articleId}`,
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const res = await axios(config);
        return resolve(res.data);
      } catch (e: any) {
        if (e.isAxiosError) {
          return resolve(e.response.data);
        }

        return resolve(e);
      }
    });
  };

  it('should return 200 with code `SUCCESS` if all fields are valid', async () => {
    const response: any = await exec();
    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('SUCCESS');
    expect(response.data.comments.length).toBeGreaterThan(0);
    commentId = response.data.comments[0].id;
  });
});

describe('POST /v1/comment/onComment/:commentId', () => {
  beforeAll(() => {
    DummyComment = dummyComment();
  });

  const exec = async () => {
    return new Promise(async (resolve) => {
      try {
        var data = JSON.stringify(DummyComment);
        const config = {
          method: 'post',
          url: `${BASE_PATH}/v1/comment/onComment/${commentId}`,
          headers: {
            'Content-Type': 'application/json',
          },
          data: data,
        };
        const res = await axios(config);
        return resolve(res.data);
      } catch (e: any) {
        if (e.isAxiosError) {
          return resolve(e.response.data);
        }

        return resolve(e);
      }
    });
  };

  it('should return 200 with code `SUCCESS` if all fields are valid', async () => {
    const response: any = await exec();
    expect(response.statusCode).toBe(200);
    expect(response.status).toBe('SUCCESS');
  });
});
