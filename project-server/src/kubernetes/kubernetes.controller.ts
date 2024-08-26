// src/kubernetes/kubernetes.controller.ts

import { Controller, Delete, Param, Post, Body } from '@nestjs/common';
import { KubernetesService } from './kubernetes.service';

@Controller('kubernetes')
export class KubernetesController {
  constructor(private readonly kubernetesService: KubernetesService) {}

  @Post('namespace')
  async createNamespace(@Body('name') name: string) {
    const { response, body } =
      await this.kubernetesService.createNamespace(name);
    return { response, body };
  }

  @Post('pod')
  async createPod(
    @Body('namespace') namespace: string,
    @Body('podSpec') podSpec: any,
  ) {
    const { response, body } = await this.kubernetesService.createPod(
      namespace,
      podSpec,
    );
    return { response, body };
  }

  @Delete('namespace/:name')
  async deleteNamespace(@Param('name') name: string) {
    const { response, body } =
      await this.kubernetesService.deleteNamespace(name);
    return { response, body };
  }

  @Delete('pod/:namespace/:podName')
  async deletePod(
    @Param('namespace') namespace: string,
    @Param('podName') podName: string,
  ) {
    const { response, body } = await this.kubernetesService.deletePod(
      namespace,
      podName,
    );
    return { response, body };
  }
}
