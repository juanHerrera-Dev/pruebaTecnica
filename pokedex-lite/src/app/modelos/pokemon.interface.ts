export interface PokemonI {
        id: number;
        name: string;
        lvl: 0;
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