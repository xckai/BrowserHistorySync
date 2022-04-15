using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SyncMangerApi.Models
{
    public partial class UrlHistory
    { 
        public int Id { get; set; }
        public HistoryDetail? HistoryDetail { get; set; }
        public DateTime? Timestamp { get; set; }
    }
}
