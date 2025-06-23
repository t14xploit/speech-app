'use client';

import { useState } from 'react';
import { Child } from '@/generated/prisma';
import { calculateLevelFromAge } from '../../prisma/seed-data/vocabulary';

interface ChildProfileManagerProps {
  children: Child[];
  onChildCreate: (childData: {
    name: string;
    birthDate: Date;
    level: number;
  }) => void;
  onChildUpdate: (childId: string, updates: Partial<Child>) => void;
  onChildDelete: (childId: string) => void;
  onChildSelect: (child: Child) => void;
  selectedChild?: Child;
}

interface ChildFormData {
  name: string;
  birthDate: string;
}

export default function ChildProfileManager({
  children,
  onChildCreate,
  onChildUpdate,
  onChildDelete,
  onChildSelect,
  selectedChild
}: ChildProfileManagerProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [formData, setFormData] = useState<ChildFormData>({
    name: '',
    birthDate: ''
  });
  const [errors, setErrors] = useState<Partial<ChildFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ChildFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'Birth date is required';
    } else {
      const birthDate = new Date(formData.birthDate);
      const now = new Date();
      const maxAge = new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
      
      if (birthDate > now) {
        newErrors.birthDate = 'Birth date cannot be in the future';
      } else if (birthDate < maxAge) {
        newErrors.birthDate = 'Child must be under 10 years old';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const birthDate = new Date(formData.birthDate);
    const level = calculateLevelFromAge(birthDate);

    if (editingChild) {
      onChildUpdate(editingChild.id, {
        name: formData.name.trim(),
        birthDate,
        level
      });
      setEditingChild(null);
    } else {
      onChildCreate({
        name: formData.name.trim(),
        birthDate,
        level
      });
      setShowCreateForm(false);
    }

    setFormData({ name: '', birthDate: '' });
    setErrors({});
  };

  const handleEdit = (child: Child) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      birthDate: child.birthDate.toISOString().split('T')[0]
    });
    setShowCreateForm(true);
  };

  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingChild(null);
    setFormData({ name: '', birthDate: '' });
    setErrors({});
  };

  const getAgeString = (birthDate: Date): string => {
    const now = new Date();
    const ageInMonths = (now.getFullYear() - birthDate.getFullYear()) * 12 + 
                       (now.getMonth() - birthDate.getMonth());
    
    if (ageInMonths < 12) {
      return `${ageInMonths} months`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}y ${months}m` : `${years} years`;
    }
  };

  const getLevelInfo = (level: number) => {
    const levelInfo = [
      { name: 'First Words', icon: '🍼', color: 'blue', description: '12-18 months' },
      { name: 'Two-Word Phrases', icon: '👶', color: 'green', description: '18-24 months' },
      { name: 'Simple Sentences', icon: '🧒', color: 'purple', description: '2-3 years' },
      { name: 'Complex Speech', icon: '👦', color: 'orange', description: '3-4 years' }
    ];
    return levelInfo[level] || levelInfo[3];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                👶 Child Profiles
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your children's profiles and track their progress
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              + Add Child
            </button>
          </div>
        </div>

        {/* Create/Edit Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {editingChild ? 'Edit Child Profile' : 'Create New Child Profile'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Child's Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter child's name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Birth Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Birth Date *
                  </label>
                  <input
                    type="date"
                    value={formData.birthDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.birthDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.birthDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
                  )}
                </div>
              </div>

              {/* Level Preview */}
              {formData.birthDate && !errors.birthDate && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Automatic Level Assignment</h3>
                  {(() => {
                    const birthDate = new Date(formData.birthDate);
                    const level = calculateLevelFromAge(birthDate);
                    const levelInfo = getLevelInfo(level);
                    return (
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{levelInfo.icon}</span>
                        <div>
                          <div className="font-medium text-gray-800">
                            Level {level}: {levelInfo.name}
                          </div>
                          <div className="text-sm text-gray-600">
                            Age: {getAgeString(birthDate)} • {levelInfo.description}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {editingChild ? 'Update Profile' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Children Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => {
            const levelInfo = getLevelInfo(child.level);
            const isSelected = selectedChild?.id === child.id;
            
            return (
              <div
                key={child.id}
                className={`
                  bg-white rounded-2xl shadow-lg p-6 cursor-pointer transition-all duration-200
                  ${isSelected 
                    ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                    : 'hover:shadow-xl hover:scale-102'
                  }
                `}
                onClick={() => onChildSelect(child)}
              >
                {/* Child Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{levelInfo.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {child.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getAgeString(child.birthDate)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(child);
                      }}
                      className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to delete ${child.name}'s profile?`)) {
                          onChildDelete(child.id);
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Level Info */}
                <div className={`bg-${levelInfo.color}-50 rounded-lg p-3 mb-4`}>
                  <div className="font-semibold text-gray-800">
                    Level {child.level}: {levelInfo.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {levelInfo.description}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-lg font-semibold text-gray-800">--</div>
                    <div className="text-xs text-gray-600">Known Words</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="text-lg font-semibold text-gray-800">--</div>
                    <div className="text-xs text-gray-600">Exercises Done</div>
                  </div>
                </div>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      ✓ Selected
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {children.length === 0 && !showCreateForm && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">👶</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Children Added Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Create your first child profile to start tracking speech development progress
            </p>
            <button
              onClick={() => setShowCreateForm(true)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg"
            >
              Add Your First Child
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
