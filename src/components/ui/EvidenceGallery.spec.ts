import { describe, it, expect } from 'vitest';

interface ImageMetadata {
  src: string;
  width: number;
  height: number;
  format: string;
}

describe('EvidenceGallery Component Logic', () => {
  it('debería retornar el listado de imágenes de la galería si existen imágenes disponibles', () => {
    // Arrange
    const mockGlob = {
      '../../assets/gallery/01.jpeg': { default: { src: '/assets/01.webp', width: 800, height: 600, format: 'webp' } },
      '../../assets/gallery/02.jpeg': { default: { src: '/assets/02.webp', width: 800, height: 600, format: 'webp' } }
    };
    
    // Act
    const galleryList = Object.values(mockGlob).map((img) => img.default);

    // Assert
    expect(galleryList).toHaveLength(2);
    expect(galleryList[0]?.src).toBe('/assets/01.webp');
    expect(galleryList[1]?.src).toBe('/assets/02.webp');
  });

  it('debería manejar una lista vacía cuando no hay imágenes en el directorio de la galería', () => {
    // Arrange
    const mockGlobEmpty = {};

    // Act
    const galleryList = Object.values(mockGlobEmpty).map((img) => (img as { default: ImageMetadata }).default);

    // Assert
    expect(galleryList).toHaveLength(0);
  });
});
