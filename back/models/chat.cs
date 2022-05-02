using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace back.models
{
    public class chat
    {
        public Guid id { get; set; }
        public Guid roomId { get; set; }
    }
}