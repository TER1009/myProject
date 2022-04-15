using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;
using back.models;

namespace back.services
{
    public class charactersDTOService
    {
        charactersRepository repository;
        characters character;
        public charactersDTOService()
        {
            repository = new charactersRepository();
            character = new characters();
        }

        public characters returnEntity(charactersDTO character)
        {
            return new characters()
            {
                id = character.id,
                typeContent = character.typeContent,
                ownerClientId = character.ownerClientId,
                lastEditor = character.lastEditor,
                description = character.description

            };
        }

        public charactersDTO returnDTO(characters character)
        {
            return new charactersDTO()
            {
                id = character.id,
                typeContent = character.typeContent,
                ownerClientId = character.ownerClientId,
                lastEditor = character.lastEditor,
                description = character.description
                
            };
        }

        public void create(charactersDTO character)
        {
            repository.create(returnEntity(character));
        }

        public List<charactersDTO> getAll()
        {
            var list = repository.getAll();
            List<charactersDTO> list2 = new List<charactersDTO>();
            for (int i = 0; i < list.Count; i++)
            {
                list2.Add(returnDTO(list[i]));
            }
            return list2;
        }

    }
}