FROM public.ecr.aws/lambda/nodejs:20 as builder
WORKDIR /usr/app
ADD src src
COPY build.mjs .
COPY package.json .
COPY tsconfig.json .
RUN npm install -g npm
RUN npm install
RUN npm run build

FROM public.ecr.aws/lambda/nodejs:20
WORKDIR ${LAMBDA_TASK_ROOT}
COPY --from=builder /usr/app/dist/ .
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json

CMD ["infra/server/awsLambda/server.handler"]

