using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;
using back.models;

namespace back.services
{
    public class roomDTOService
    {
        roomRepository repository;
        public roomDTOService()
        {
            repository = new roomRepository();
        }

        private room returnRoom(roomDTO room)
        {
            return new room()
            {
                id = room.id,
                ownerId = room.ownerId,
                topic = room.topic,
                owner = room.owner,
            };
        }

        private roomDTO returnDTO(room room)
        {
            return new roomDTO()
            {
                id = room.id,
                ownerId = room.ownerId,
                topic = room.topic,
                owner = room.owner,
            };
        }

        public void create(roomDTO room)
        {
            repository.create(returnRoom(room));
        }

        public List<roomDTO> getAll()
        {
            var list = repository.getAll();
            var list2 = new List<roomDTO>();
            foreach (var item in list)
            {
                list2.Add(returnDTO(item));
            }
            return list2;
        }

        public roomDTO getById(Guid id)
        {
            var _room = repository.getById(id);
            if (_room == null) return null;
            else return returnDTO(_room);
        }
    }
}