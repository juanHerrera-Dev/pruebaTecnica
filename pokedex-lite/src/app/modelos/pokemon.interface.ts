export interface PokemonI {
        id: number;
        name: string;
        lvl: number;
        evolutionId: number;
        abilities: [
          {
            name: string;
            description: string
          }
        ];
        type: [
          string
        ];
        image: string
}