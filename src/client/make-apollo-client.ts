
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from "@apollo/client/core";
import axios from 'axios'
import { RequestInfo, RequestInit, Response } from 'node-fetch';


interface makeApolloClientOptions {
  url:string
  token: string
}
export const makeApolloClient = ({url, token}:makeApolloClientOptions): ApolloClient<NormalizedCacheObject> => {
  const axiosInstance = axios.create({
    headers:{
      'X-Galileo-Token': token
    }
  });

  const fetch = async (input:RequestInfo, options: RequestInit): Promise<Response> => {
    const res = await axiosInstance({
      url: input as string,
      method:'post',
      data: options.body
    })
    const ret = new Response(JSON.stringify(res.data))
    return ret
  }


  const link = new HttpLink({
    uri: url,
    //@ts-ignore
    fetch: fetch
  });

  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    link
  });

  return client
}
