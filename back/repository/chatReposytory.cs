using System;
using back.interfaces;
using back.models;
using System.Collections.Generic;
using back.db;
using System.Linq;
using back.DTO;

namespace back.repository
{
    public class chatRepository : iBaseRepository<chat>
    {
        dbContextFWebsite db;
        public chatRepository()
        {
            db = new dbContextFWebsite();
        }
        public void create(chat item)
        {
            db.Chats.Add(item);
            db.SaveChanges();
        }
        public void update(chat item)
        {
            db.Chats.Update(item);
            db.SaveChanges();
        }
        public List<chat> getAll()
        {
            if (db.Chats.Count() > 0) return db.Chats.ToList();
            else return null;
        }
        public chat getById(Guid id)
        {
            var list = getAll();
            if (list.Count() > 0)
            {
                var _chat = list.First(x => x.roomId == id);
                if (_chat != null) return _chat;
                else return null;
            }
            else return null;
        }
        public void delete(chat item)
        {
            db.Chats.Remove(item);
            db.SaveChanges();
        }

        public chat returnChat(chatDTO _chat)
        {
            return new chat()
            {
                chatId = _chat.chatId,
                roomId = _chat.roomId,
                messages = _chat.messages,
            };
        }

        public chatDTO returnDTO(chat _chat)
        {
            return new chatDTO()
            {
                chatId = _chat.chatId,
                roomId = _chat.roomId,
                messages = _chat.messages,
            };
        }
    }
}