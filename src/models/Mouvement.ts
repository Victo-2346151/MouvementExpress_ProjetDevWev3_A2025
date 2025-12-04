import mongoose, { Schema, Document } from 'mongoose';

export interface IMouvement extends Document {
  reference: string;
  typeOperation: 'entree' | 'sortie';
  produit: string;
  entrepot: string;
  quantite: number;
  urgent: boolean;
  dateOperation: Date;
  commentaire?: string;
}

/* Validations*/
const quantitePositive = {
  validator: (value: number) => value > 0,
  message: 'La quantité doit être supérieure à 0.',
};

const dateNonFuture = {
  validator: (value: Date) => value <= new Date(),
  message: 'La date du mouvement ne peut pas être dans le futur.',
};

/* SCHEMA*/
const MouvementSchema = new Schema<IMouvement>(
  {
    reference: {
      type: String,
      required: [true, 'La référence est obligatoire.'],
      trim: true,
      minlength: [3, 'La référence doit contenir au moins 3 caractères.'],
      maxlength: [50, 'La référence ne peut pas dépasser 50 caractères.'],
    },

    typeOperation: {
      type: String,
      required: [true, "Le type d'opération est obligatoire."],
      enum: {
        values: ['entree', 'sortie'],
        message: "Le type d'opération doit être 'entree' ou 'sortie'.",
      },
    },

    produit: {
      type: String,
      required: [true, 'Le nom du produit est obligatoire.'],
      trim: true,
      minlength: [2, 'Le nom du produit doit contenir au moins 2 caractères.'],
      maxlength: [
        100,
        'Le nom du produit ne peut pas dépasser 100 caractères.',
      ],
    },

    entrepot: {
      type: String,
      required: [true, "Le nom de l'entrepôt est obligatoire."],
      trim: true,
      minlength: [
        2,
        "Le nom de l'entrepôt doit contenir au moins 2 caractères.",
      ],
      maxlength: [
        100,
        "Le nom de l'entrepôt ne peut pas dépasser 100 caractères.",
      ],
    },

    quantite: {
      type: Number,
      required: [true, 'La quantité est obligatoire.'],
      min: [1, "La quantité doit être d'au moins 1."],
      validate: quantitePositive,
    },

    urgent: {
      type: Boolean,
      required: [true, 'Le statut urgent doit être spécifié.'],
    },

    dateOperation: {
      type: Date,
      required: [true, "La date d'opération est obligatoire."],
      validate: dateNonFuture,
    },

    commentaire: {
      type: String,
      trim: true,
      maxlength: [300, 'Le commentaire ne peut pas dépasser 300 caractères.'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IMouvement>('Mouvement', MouvementSchema);
