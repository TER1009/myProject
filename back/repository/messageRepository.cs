using System;
using back.interfaces;
using back.models;
using System.Collections.Generic;
using back.db;
using System.Linq;
using back.DTO;

namespace back.repository
{
    public class messageRepository
    {
        dbContextFWebsite db;
        public messageRepository()
        {
            db = new dbContextFWebsite();
        }

        public void create(messageDTO item)
        {
            db.Messages.Add(returnEntity(item));
            db.SaveChanges();
        }

        public List<messageDTO> getAll()
        {
            var list = db.Messages.ToList();
            List<messageDTO> result = new List<messageDTO>();
            foreach (var item in list)
            {
                result.Add(new messageDTO()
                {
                    id = item.id,
                    ownerId = item.ownerId,
                    name = item.name,
                    time = item.time,
                    text = item.text,
                });
            }
            return result;
        }

        public messageDTO getById(Guid id)
        {
            return getAll().First(_item => _item.id == id);
        }

        public message returnEntity(messageDTO item)
        {
            return new message()
            {
                id = item.id,
                ownerId = item.ownerId,
                name = item.name,
                time = item.time,
                text = item.text,
            };
        }
        public messageDTO returnDTO(message item)
        {
            return new messageDTO()
            {
                id = item.id,
                ownerId = item.ownerId,
                name = item.name,
                time = item.time,
                text = item.text,
            };
        }
    }
}