// src/kubernetes/kubernetes.service.ts

import { Injectable } from '@nestjs/common';
import * as k8s from '@kubernetes/client-node';
import * as http from 'http';

@Injectable()
export class KubernetesService {
  private k8sApi: k8s.CoreV1Api;

  constructor() {
    const kc = new k8s.KubeConfig();
    kc.loadFromDefault();
    this.k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  }

  async createNamespace(namespace: string): Promise<{
    response: http.IncomingMessage;
    body: k8s.V1Namespace;
  }> {
    const ns = {
      metadata: {
        name: namespace,
      },
    };
    return this.k8sApi.createNamespace(ns);
  }

  async createPod(
    namespace: string,
    podSpec: k8s.V1Pod,
  ): Promise<{
    response: http.IncomingMessage;
    body: k8s.V1Pod;
  }> {
    return this.k8sApi.createNamespacedPod(namespace, podSpec);
  }

  async deleteNamespace(namespace: string): Promise<{
    response: http.IncomingMessage;
    body: k8s.V1Status;
  }> {
    return this.k8sApi.deleteNamespace(namespace);
  }

  async deletePod(
    namespace: string,
    podName: string,
  ): Promise<{
    response: http.IncomingMessage;
    body: k8s.V1Pod;
  }> {
    return this.k8sApi.deleteNamespacedPod(podName, namespace);
  }
}
