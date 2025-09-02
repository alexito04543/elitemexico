export interface ModelInfo {
  name: string;
  path: string;
  size: number;
}

export interface CompressionStrategy {
  name: string;
  description: string;
  sizeReduction: number;
  qualityLoss: number;
  loadTime: string;
  recommended: string;
}

export interface CompressionEstimate {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  estimatedLoadTime: number;
}

export class ModelCompressor {
  static getOptimizationStrategies(): Record<string, CompressionStrategy> {
    return {
      draco: {
        name: 'DRACO Compression',
        description: 'Compresión geométrica avanzada para reducir significativamente el tamaño de mallas.',
        sizeReduction: 85,
        qualityLoss: 0,
        loadTime: 'Rápido',
        recommended: 'Ideal para modelos complejos'
      },
      textureOptimization: {
        name: 'Optimización de Texturas',
        description: 'Compresión y redimensionamiento inteligente de texturas manteniendo calidad visual.',
        sizeReduction: 60,
        qualityLoss: 5,
        loadTime: 'Medio',
        recommended: 'Perfecto para texturas HD'
      },
      lodGeneration: {
        name: 'Generación LOD',
        description: 'Creación automática de niveles de detalle para renderizado adaptivo.',
        sizeReduction: 40,
        qualityLoss: 10,
        loadTime: 'Instantáneo',
        recommended: 'Esencial para performance'
      },
      materialMerging: {
        name: 'Fusión de Materiales',
        description: 'Combina materiales similares para reducir draw calls y mejorar performance.',
        sizeReduction: 25,
        qualityLoss: 0,
        loadTime: 'Muy Rápido',
        recommended: 'Siempre recomendado'
      }
    };
  }

  static estimateCompression(modelPath: string, originalSize: number): CompressionEstimate {
    const compressionRatio = modelPath.includes('ferrari') ? 75 : 
                           modelPath.includes('lamborghini') ? 65 : 70;
    
    const compressedSize = originalSize * (1 - compressionRatio / 100);
    
    return {
      originalSize,
      compressedSize: Number(compressedSize.toFixed(1)),
      compressionRatio,
      estimatedLoadTime: this.estimateLoadTime(compressedSize, 'high')
    };
  }

  static estimateLoadTime(sizeInMB: number, connectionSpeed: 'slow' | 'medium' | 'high'): number {
    const speeds = {
      slow: 0.5,   // 0.5 MB/s
      medium: 2,   // 2 MB/s  
      high: 8      // 8 MB/s
    };
    
    return Number((sizeInMB / speeds[connectionSpeed]).toFixed(1));
  }

  static getRecommendations(models: ModelInfo[]): string[] {
    const recommendations: string[] = [];
    
    models.forEach(model => {
      if (model.size > 50) {
        recommendations.push(`${model.name}: Aplicar compresión DRACO agresiva (>50MB)`);
      } else if (model.size > 20) {
        recommendations.push(`${model.name}: Optimizar texturas y generar LOD (>20MB)`);
      } else if (model.size > 10) {
        recommendations.push(`${model.name}: Fusionar materiales similares (>10MB)`);
      }
    });

    if (recommendations.length === 0) {
      recommendations.push('Todos los modelos están optimizados correctamente');
    }

    return recommendations;
  }
}