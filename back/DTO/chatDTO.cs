using System;
using System.Collections.Generic;
using back.models;

namespace back.DTO
{
    public class chatDTO
    {
        public Guid chatId { get; set; }
        public Guid roomId { get; set; }
    }
}