'use client';

import { useState, useEffect } from 'react';
import { ModelCompressor, ModelInfo } from '@/utils/modelCompression';

export function OptimizationDashboard() {
  const [models] = useState<ModelInfo[]>([
    { name: 'Ferrari 488 GTB', path: '/models/2016_ferrari_488_gtb.glb', size: 10.3 },
    { name: 'Lamborghini Huracán', path: '/models/lamborghini_huracan_evo.glb', size: 29.5 },
    { name: 'McLaren 720S', path: '/models/mclaren_720s.glb', size: 58.8 }
  ]);

  const strategies = ModelCompressor.getOptimizationStrategies();
  const recommendations = ModelCompressor.getRecommendations(models);
  const totalSize = models.reduce((sum, model) => sum + model.size, 0);

  return (
    <div className="bg-gray-900 rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white mb-4">
        Panel de Optimización de Modelos 3D
      </h2>

      {/* Current Status */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-blue-300 mb-3">Estado Actual</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{totalSize.toFixed(1)} MB</div>
            <div className="text-gray-400 text-sm">Tamaño Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{models.length}</div>
            <div className="text-gray-400 text-sm">Modelos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {ModelCompressor.estimateLoadTime(totalSize, 'medium')}s
            </div>
            <div className="text-gray-400 text-sm">Tiempo de Carga</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">Alta</div>
            <div className="text-gray-400 text-sm">Calidad Actual</div>
          </div>
        </div>

        {/* Individual Models */}
        <div className="space-y-2">
          {models.map((model, index) => (
            <div key={index} className="flex justify-between items-center bg-gray-700 rounded p-3">
              <span className="text-white font-medium">{model.name}</span>
              <div className="flex items-center space-x-4">
                <span className="text-gray-300">{model.size} MB</span>
                <span className="text-gray-400 text-sm">
                  ~{ModelCompressor.estimateLoadTime(model.size, 'medium')}s
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Strategies */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-green-300 mb-3">Estrategias de Optimización</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(strategies).map(([key, strategy]) => (
            <div key={key} className="bg-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">{strategy.name}</h4>
                <span className="text-green-400 text-sm font-bold">
                  -{strategy.sizeReduction}%
                </span>
              </div>
              <p className="text-gray-300 text-sm mb-3">{strategy.description}</p>
              
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-400">Calidad:</span>
                  <span className="text-yellow-300 ml-1">-{strategy.qualityLoss}%</span>
                </div>
                <div>
                  <span className="text-gray-400">Carga:</span>
                  <span className="text-blue-300 ml-1">{strategy.loadTime}</span>
                </div>
              </div>
              
              <div className="mt-2 text-xs text-purple-300">
                📋 {strategy.recommended}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compression Estimates */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-cyan-300 mb-3">Estimaciones de Compresión</h3>
        <div className="space-y-3">
          {models.map((model, index) => {
            const compression = ModelCompressor.estimateCompression(model.path, model.size);
            return (
              <div key={index} className="bg-gray-700 rounded p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{model.name}</span>
                  <span className="text-green-400 font-bold">
                    -{compression.compressionRatio}%
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Original:</span>
                    <span className="text-red-300 ml-1">{compression.originalSize} MB</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Comprimido:</span>
                    <span className="text-green-300 ml-1">{compression.compressedSize} MB</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ahorro:</span>
                    <span className="text-blue-300 ml-1">
                      {(compression.originalSize - compression.compressedSize).toFixed(1)} MB
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-yellow-300 mb-3">Recomendaciones</h3>
        <div className="space-y-2">
          {recommendations.map((rec: string, index: number) => (
            <div key={index} className="flex items-start space-x-2 text-gray-300">
              <span className="text-yellow-400 mt-0.5">•</span>
              <span className="text-sm">{rec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-orange-300 mb-3">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
            🗜️ Comprimir Modelos
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm transition-colors">
            📊 Análisis Detallado
          </button>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm transition-colors">
            ⚡ Optimizar LOD
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm transition-colors">
            🧹 Limpiar Caché
          </button>
        </div>
      </div>
    </div>
  );
}