-- 꼼꼼클린 견적 문의 테이블
-- 서버 MariaDB에서 1회 실행: mysql -u사용자 -p DB이름 < schema.sql
CREATE TABLE IF NOT EXISTS inquiries (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  name       VARCHAR(50)  NOT NULL,
  phone      VARCHAR(30)  NOT NULL,
  addr       VARCHAR(120) NOT NULL DEFAULT '',
  size       VARCHAR(20)  NOT NULL DEFAULT '',
  services   VARCHAR(200) NOT NULL DEFAULT '',
  hope_date  DATE         NULL,
  memo       TEXT         NULL,
  PRIMARY KEY (id),
  KEY idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
