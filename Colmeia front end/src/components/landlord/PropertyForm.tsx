import React, { useState, useCallback } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

export interface PropertyData {
  name: string;
  address: string;
  propertyType: string;
  rentPrice: string;
  description: string;
  photos: string[]; // Base64 for preview
  photoFiles: File[]; // File objects for upload
}

interface PropertyFormProps {
  onSubmit: (data: PropertyData) => void;
  onCancel: () => void;
}

export function PropertyForm({ onSubmit, onCancel }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyData>({
    name: '',
    address: '',
    propertyType: '',
    rentPrice: '',
    description: '',
    photos: [],
    photoFiles: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PropertyData, string>>>({});
  const [isDragging, setIsDragging] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof PropertyData, string>> = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }

    if (!formData.propertyType) {
      newErrors.propertyType = 'Tipo de propriedade é obrigatório';
    }

    if (!formData.rentPrice.trim()) {
      newErrors.rentPrice = 'Valor do aluguel é obrigatório';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Descrição deve ter no máximo 500 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const amount = parseFloat(numbers) / 100;
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handlePriceChange = (value: string) => {
    const formatted = formatCurrency(value);
    setFormData({ ...formData, rentPrice: formatted });
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith('image/'));
    
    // Use functional update to get current state
    setFormData((prev) => {
      // Limit to 5 photos
      const remainingSlots = 5 - prev.photoFiles.length;
      const filesToAdd = imageFiles.slice(0, remainingSlots);
      
      let addedCount = 0;
      
      filesToAdd.forEach((file) => {
        // Validate file size (max 2MB as per requirements)
        const maxSize = 2 * 1024 * 1024; // 2MB
        if (file.size > maxSize) {
          alert(`O arquivo ${file.name} excede o tamanho máximo de 2MB`);
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((current) => ({
            ...current,
            photos: [...current.photos, reader.result as string],
            photoFiles: [...current.photoFiles, file],
          }));
        };
        reader.readAsDataURL(file);
        addedCount++;
      });
      
      if (imageFiles.length > remainingSlots) {
        setTimeout(() => {
          alert(`Você pode adicionar no máximo 5 fotos. ${addedCount} foto(s) adicionada(s).`);
        }, 0);
      }
      
      return prev; // Return unchanged state, updates happen in FileReader callbacks
    });
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
      photoFiles: formData.photoFiles.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100 p-8">
        {/* Cabeçalho */}
        <div className="mb-8">
          <h1 className="text-amber-900 mb-2">Cadastrar Novo Local</h1>
          <p className="text-amber-700/70">
            Preencha as informações do seu imóvel
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nome do Local */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-amber-900">
              Nome do Local *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                errors.name ? 'border-red-400' : ''
              }`}
              placeholder="Ex: Apartamento Centro"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Endereço */}
          <div className="space-y-2">
            <Label htmlFor="address" className="text-amber-900">
              Endereço *
            </Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl resize-none ${
                errors.address ? 'border-red-400' : ''
              }`}
              placeholder="Rua, número, bairro, cidade - UF"
              rows={2}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address}</p>
            )}
          </div>

          {/* Tipo de Propriedade */}
          <div className="space-y-2">
            <Label htmlFor="propertyType" className="text-amber-900">
              Tipo de Propriedade *
            </Label>
            <Select
              value={formData.propertyType}
              onValueChange={(value) =>
                setFormData({ ...formData, propertyType: value })
              }
            >
              <SelectTrigger
                className={`bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                  errors.propertyType ? 'border-red-400' : ''
                }`}
              >
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="kitnet">Kitnet</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="cobertura">Cobertura</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>
            {errors.propertyType && (
              <p className="text-red-500 text-sm">{errors.propertyType}</p>
            )}
          </div>

          {/* Valor do Aluguel */}
          <div className="space-y-2">
            <Label htmlFor="rentPrice" className="text-amber-900">
              Valor do Aluguel *
            </Label>
            <Input
              id="rentPrice"
              value={formData.rentPrice}
              onChange={(e) => handlePriceChange(e.target.value)}
              className={`bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl ${
                errors.rentPrice ? 'border-red-400' : ''
              }`}
              placeholder="R$ 0,00"
            />
            {errors.rentPrice && (
              <p className="text-red-500 text-sm">{errors.rentPrice}</p>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-amber-900">
              Descrição (Opcional)
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className={`bg-amber-50/50 border-amber-200 focus:border-amber-400 focus:ring-amber-400/20 rounded-xl resize-none ${
                errors.description ? 'border-red-400' : ''
              }`}
              placeholder="Descreva seu imóvel..."
              rows={4}
              maxLength={500}
            />
            <div className="flex justify-between items-center">
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
              <p className="text-amber-700/50 text-sm ml-auto">
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Upload de Fotos */}
          <div className="space-y-2">
            <Label className="text-amber-900">Fotos do Imóvel (Opcional)</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-amber-200 bg-amber-50/30'
              }`}
            >
              <input
                type="file"
                id="photos"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
              />
              <label
                htmlFor="photos"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-amber-500" />
                </div>
                <p className="text-amber-900 mb-1">
                  Arraste fotos ou clique para selecionar
                </p>
                <p className="text-amber-700/70 text-sm">
                  PNG, JPG ou JPEG (max. 2MB cada, até 5 fotos)
                </p>
              </label>
            </div>

            {/* Preview das Fotos */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-3 gap-4 mt-4">
                {formData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden border-2 border-amber-200 aspect-square"
                  >
                    <img
                      src={photo}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Botões */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              Confirmar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
