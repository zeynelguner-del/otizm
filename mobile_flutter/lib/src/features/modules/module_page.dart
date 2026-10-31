import 'dart:async';
import 'dart:convert';
import 'dart:math';
import 'package:flutter/material.dart';
import 'package:otizm_destek_app/l10n/app_localizations.dart';
import 'package:flutter/services.dart';
import 'package:audioplayers/audioplayers.dart';
import 'package:flutter_tts/flutter_tts.dart';

import '../../core/notifications/notification_service.dart';
import '../../core/storage/local_store.dart';

class ModulePage extends StatelessWidget {
  final String moduleKey;
  const ModulePage({super.key, required this.moduleKey});

  String getTitle(BuildContext context) {
    switch (moduleKey) {
      case 'guides':
        return 'Otizm & Özel Eğitim Rehberi';
      case 'info':
        return AppLocalizations.of(context)!.moduleTitleInfo;
      case 'osb':
        return AppLocalizations.of(context)!.moduleTitleOsb;
      case 'osb_research':
        return AppLocalizations.of(context)!.moduleTitleOsbResearch;
      case 'education':
        return AppLocalizations.of(context)!.moduleTitleEducation;
      case 'emotions':
        return AppLocalizations.of(context)!.moduleTitleEmotions;
      case 'games':
        return AppLocalizations.of(context)!.moduleTitleGames;
      case 'stories':
        return AppLocalizations.of(context)!.moduleTitleStories;
      case 'music':
        return AppLocalizations.of(context)!.moduleTitleMusic;
      case 'acc':
        return AppLocalizations.of(context)!.moduleTitleAcc;
      case 'calendar':
        return AppLocalizations.of(context)!.moduleTitleCalendar;
      case 'education_reminder':
        return AppLocalizations.of(context)!.moduleTitleEduReminder;
      case 'sensory':
        return AppLocalizations.of(context)!.moduleTitleSensory;
      case 'objects':
        return AppLocalizations.of(context)!.moduleTitleObjects;
      case 'sentence_sounds':
        return AppLocalizations.of(context)!.moduleTitleSentenceSounds;
      case 'imitation':
        return AppLocalizations.of(context)!.moduleTitleImitation;
      default:
        return AppLocalizations.of(context)!.moduleTitleDefault;
    }
  }

  Color get moduleColor {
    switch (moduleKey) {
      case 'guides':
        return const Color(0xFF059669);
      case 'info':
        return const Color(0xFF2563EB);
      case 'osb':
        return const Color(0xFF0891B2);
      case 'osb_research':
        return const Color(0xFF0D9488);
      case 'education':
        return const Color(0xFF7C3AED);
      case 'emotions':
        return const Color(0xFFE11D48);
      case 'games':
        return const Color(0xFF0284C7);
      case 'stories':
        return const Color(0xFF059669);
      case 'music':
        return const Color(0xFF4F46E5);
      case 'acc':
        return const Color(0xFFD97706);
      case 'calendar':
        return const Color(0xFFEA580C);
      case 'education_reminder':
        return const Color(0xFF047857);
      case 'sensory':
        return const Color(0xFF0891B2);
      case 'objects':
        return const Color(0xFFEC4899);
      case 'sentence_sounds':
        return const Color(0xFF8B5CF6);
      case 'imitation':
        return const Color(0xFF10B981);
      default:
        return const Color(0xFF18181B);
    }
  }

  @override
  Widget build(BuildContext context) {
    final Widget body;
    switch (moduleKey) {
      case 'guides':
        body = const _GuidesModuleBody();
        break;
      case 'info':
        body = const _InfoModuleBody();
        break;
      case 'osb':
        body = const _OsbModuleBody();
        break;
      case 'osb_research':
        body = const _OsbResearchModuleBody();
        break;
      case 'education':
        body = const _EducationModuleBody();
        break;
      case 'emotions':
        body = const _EmotionsModuleBody();
        break;
      case 'stories':
        body = const _StoriesModuleBody();
        break;
      case 'music':
        body = const _MusicModuleBody();
        break;
      case 'acc':
        body = const _AccModuleBody();
        break;
      case 'calendar':
        body = const _CalendarModuleBody();
        break;
      case 'education_reminder':
        body = const _EducationReminderModuleBody();
        break;
      case 'games':
        body = const _GamesModuleBody();
        break;
      case 'sensory':
        body = const _SensoryModuleBody();
        break;
      case 'objects':
        body = const _ObjectsModuleBody();
        break;
      case 'sentence_sounds':
        body = const _SentenceSoundsModuleBody();
        break;
      case 'imitation':
        body = const _ImitationModuleBody();
        break;
      default:
        body = _ComingSoonBody(title: getTitle(context));
        break;
    }

    final color = moduleColor;

    return Scaffold(
      appBar: AppBar(
        iconTheme: IconThemeData(color: color),
        title: Text(
          getTitle(context),
          style: TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: color,
          ),
        ),
      ),
      body: body,
    );
  }
}

class _GuidesModuleBody extends StatefulWidget {
  const _GuidesModuleBody();

  @override
  State<_GuidesModuleBody> createState() => _GuidesModuleBodyState();
}

class _GuidesModuleBodyState extends State<_GuidesModuleBody> {
  String _selectedCategory = 'Tümü';
  Map<String, dynamic>? _data;
  bool _loading = true;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (_loading) {
      _loadGuides();
    }
  }

  Future<void> _loadGuides() async {
    final locale = Localizations.localeOf(context).languageCode;
    try {
      final jsonStr = await DefaultAssetBundle.of(context).loadString('assets/content/$locale/guides.json');
      final decoded = json.decode(jsonStr) as Map<String, dynamic>;
      final cats = List<String>.from(decoded['categories'] ?? ['Tümü']);
      if (mounted) {
        setState(() {
          _data = decoded;
          _selectedCategory = cats.first;
          _loading = false;
        });
      }
    } catch (e) {
      try {
        final jsonStr = await DefaultAssetBundle.of(context).loadString('assets/content/tr/guides.json');
        final decoded = json.decode(jsonStr) as Map<String, dynamic>;
        final cats = List<String>.from(decoded['categories'] ?? ['Tümü']);
        if (mounted) {
          setState(() {
            _data = decoded;
            _selectedCategory = cats.first;
            _loading = false;
          });
        }
      } catch (_) {
        if (mounted) {
          setState(() => _loading = false);
        }
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_data == null) {
      return const Center(child: Text('Rehber içerikleri yüklenemedi.'));
    }

    final heroBadge = (_data!['heroBadge'] ?? 'Bilimsel ve Pedagojik Bilgi Merkezi') as String;
    final heroTitle = (_data!['heroTitle'] ?? 'Otizm ve Özel Eğitim Rehberi') as String;
    final heroSubtitle = (_data!['heroSubtitle'] ?? '') as String;
    final categories = List<String>.from(_data!['categories'] ?? ['Tümü']);
    final allArticles = List<Map<String, dynamic>>.from(
      (_data!['articles'] as List? ?? []).map((e) => Map<String, dynamic>.from(e as Map)),
    );

    final firstCat = categories.isNotEmpty ? categories.first : 'Tümü';
    final filteredArticles = (_selectedCategory == firstCat || _selectedCategory == 'Tümü' || _selectedCategory == 'All')
        ? allArticles
        : allArticles.where((a) => a['category'] == _selectedCategory).toList();

    return Container(
      color: const Color(0xFFF3F4F6),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 12, 16, 32),
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Color(0xFF065F46),
                  Color(0xFF059669),
                  Color(0xFF0D9488),
                ],
              ),
              borderRadius: BorderRadius.circular(26),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF059669).withOpacity(0.24),
                  blurRadius: 14,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.menu_book_rounded, color: Colors.white, size: 14),
                      const SizedBox(width: 6),
                      Text(
                        heroBadge.toUpperCase(),
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 10,
                          fontWeight: FontWeight.w900,
                          letterSpacing: 0.7,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  heroTitle,
                  style: const TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    letterSpacing: -0.4,
                    height: 1.15,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  heroSubtitle,
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.92),
                    fontSize: 13,
                    fontWeight: FontWeight.w600,
                    height: 1.4,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          SizedBox(
            height: 40,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: categories.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, idx) {
                final cat = categories[idx];
                final isSelected = cat == _selectedCategory;
                return ChoiceChip(
                  label: Text(
                    cat,
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 12.5,
                      color: isSelected ? Colors.white : const Color(0xFF374151),
                    ),
                  ),
                  selected: isSelected,
                  selectedColor: const Color(0xFF059669),
                  backgroundColor: Colors.white,
                  checkmarkColor: Colors.white,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                    side: BorderSide(
                      color: isSelected ? const Color(0xFF059669) : const Color(0xFFE5E7EB),
                      width: 1.5,
                    ),
                  ),
                  onSelected: (_) => setState(() => _selectedCategory = cat),
                );
              },
            ),
          ),
          const SizedBox(height: 16),

          ...filteredArticles.map((article) {
            final title = (article['title'] ?? '') as String;
            final summary = (article['summary'] ?? '') as String;
            final category = (article['category'] ?? '') as String;
            final readTime = (article['readTime'] ?? '') as String;
            final emoji = (article['emoji'] ?? '📘') as String;
            final author = (article['author'] ?? '') as String;

            return Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: Card(
                elevation: 0,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(24),
                  side: const BorderSide(color: Color(0xFFE5E7EB), width: 1.5),
                ),
                child: InkWell(
                  borderRadius: BorderRadius.circular(24),
                  onTap: () => _openGuideArticleDetail(context, article),
                  child: Padding(
                    padding: const EdgeInsets.all(18),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Container(
                              width: 44,
                              height: 44,
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                color: const Color(0xFFECFDF5),
                                borderRadius: BorderRadius.circular(14),
                                border: Border.all(color: const Color(0xFFA7F3D0)),
                              ),
                              child: Text(emoji, style: const TextStyle(fontSize: 22)),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Wrap(
                                spacing: 8,
                                runSpacing: 4,
                                crossAxisAlignment: WrapCrossAlignment.center,
                                children: [
                                  Container(
                                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                    decoration: BoxDecoration(
                                      color: const Color(0xFFD1FAE5),
                                      borderRadius: BorderRadius.circular(10),
                                    ),
                                    child: Text(
                                      category.toUpperCase(),
                                      style: const TextStyle(
                                        color: Color(0xFF065F46),
                                        fontWeight: FontWeight.w900,
                                        fontSize: 10,
                                        letterSpacing: 0.5,
                                      ),
                                    ),
                                  ),
                                  Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      const Icon(Icons.schedule_rounded, size: 14, color: Color(0xFF6B7280)),
                                      const SizedBox(width: 4),
                                      Text(
                                        readTime,
                                        style: const TextStyle(
                                          color: Color(0xFF6B7280),
                                          fontWeight: FontWeight.w700,
                                          fontSize: 12,
                                        ),
                                      ),
                                    ],
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Text(
                          title,
                          style: const TextStyle(
                            fontSize: 17,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF111827),
                            height: 1.25,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          summary,
                          maxLines: 3,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 13.5,
                            fontWeight: FontWeight.w600,
                            color: Color(0xFF4B5563),
                            height: 1.4,
                          ),
                        ),
                        const SizedBox(height: 14),
                        const Divider(height: 1, color: Color(0xFFF3F4F6)),
                        const SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Expanded(
                              child: Text(
                                author,
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                                style: const TextStyle(
                                  fontSize: 11.5,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFF6B7280),
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: const [
                                Text(
                                  'Makaleyi Oku',
                                  style: TextStyle(
                                    color: Color(0xFF059669),
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13,
                                  ),
                                ),
                                SizedBox(width: 4),
                                Icon(Icons.arrow_forward_rounded, size: 16, color: Color(0xFF059669)),
                              ],
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }
}

void _openGuideArticleDetail(BuildContext context, Map<String, dynamic> article) {
  final title = (article['title'] ?? '') as String;
  final category = (article['category'] ?? '') as String;
  final readTime = (article['readTime'] ?? '') as String;
  final publishedDate = (article['publishedDate'] ?? '') as String;
  final author = (article['author'] ?? '') as String;
  final emoji = (article['emoji'] ?? '📘') as String;
  final content = Map<String, dynamic>.from(article['content'] as Map? ?? {});
  final intro = (content['intro'] ?? '') as String;
  final conclusion = (content['conclusion'] ?? '') as String;
  final sections = List<Map<String, dynamic>>.from(
    (content['sections'] as List? ?? []).map((e) => Map<String, dynamic>.from(e as Map)),
  );
  final faqs = List<Map<String, dynamic>>.from(
    (content['faqs'] as List? ?? []).map((e) => Map<String, dynamic>.from(e as Map)),
  );

  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
    ),
    builder: (context) {
      return SafeArea(
        child: SizedBox(
          height: MediaQuery.of(context).size.height * 0.88,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.fromLTRB(20, 4, 12, 12),
                child: Row(
                  children: [
                    Text(emoji, style: const TextStyle(fontSize: 24)),
                    const SizedBox(width: 10),
                    Expanded(
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: const Color(0xFFD1FAE5),
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: Text(
                          '$category • $readTime',
                          style: const TextStyle(
                            color: Color(0xFF065F46),
                            fontWeight: FontWeight.w900,
                            fontSize: 11.5,
                          ),
                        ),
                      ),
                    ),
                    IconButton(
                      onPressed: () => Navigator.of(context).pop(),
                      icon: const Icon(Icons.close_rounded),
                    ),
                  ],
                ),
              ),
              const Divider(height: 1),
              Expanded(
                child: SingleChildScrollView(
                  padding: const EdgeInsets.fromLTRB(20, 18, 20, 36),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      SelectableText(
                        title,
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF111827),
                          height: 1.25,
                        ),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          const Icon(Icons.verified_rounded, size: 16, color: Color(0xFF059669)),
                          const SizedBox(width: 6),
                          Expanded(
                            child: Text(
                              '$author  •  $publishedDate',
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w700,
                                color: Color(0xFF6B7280),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 18),

                      if (intro.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: const Color(0xFFECFDF5),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: const Color(0xFFA7F3D0), width: 1.5),
                          ),
                          child: SelectableText(
                            intro,
                            style: const TextStyle(
                              fontSize: 15,
                              fontWeight: FontWeight.w700,
                              color: Color(0xFF064E3B),
                              height: 1.5,
                            ),
                          ),
                        ),
                        const SizedBox(height: 22),
                      ],

                      ...sections.map((sec) {
                        final heading = (sec['heading'] ?? '') as String;
                        final paragraphs = List<String>.from(sec['paragraphs'] ?? []);
                        final listItems = List<String>.from(sec['listItems'] ?? []);
                        final tipBox = sec['tipBox'] != null
                            ? Map<String, dynamic>.from(sec['tipBox'] as Map)
                            : null;

                        return Padding(
                          padding: const EdgeInsets.only(bottom: 24),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.only(left: 12),
                                decoration: const BoxDecoration(
                                  border: Border(
                                    left: BorderSide(color: Color(0xFF059669), width: 4),
                                  ),
                                ),
                                child: Text(
                                  heading,
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFF111827),
                                    height: 1.3,
                                  ),
                                ),
                              ),
                              const SizedBox(height: 12),
                              ...paragraphs.map(
                                (p) => Padding(
                                  padding: const EdgeInsets.only(bottom: 12),
                                  child: SelectableText(
                                    p,
                                    style: const TextStyle(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFF374151),
                                      height: 1.55,
                                    ),
                                  ),
                                ),
                              ),
                              if (listItems.isNotEmpty) ...[
                                const SizedBox(height: 4),
                                ...listItems.map(
                                  (item) => Padding(
                                    padding: const EdgeInsets.only(bottom: 10),
                                    child: Row(
                                      crossAxisAlignment: CrossAxisAlignment.start,
                                      children: [
                                        const Padding(
                                          padding: EdgeInsets.only(top: 3),
                                          child: Icon(
                                            Icons.check_circle_rounded,
                                            color: Color(0xFF059669),
                                            size: 18,
                                          ),
                                        ),
                                        const SizedBox(width: 10),
                                        Expanded(
                                          child: SelectableText(
                                            item,
                                            style: const TextStyle(
                                              fontSize: 14.5,
                                              fontWeight: FontWeight.w600,
                                              color: Color(0xFF1F2937),
                                              height: 1.5,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                  ),
                                ),
                              ],
                              if (tipBox != null) ...[
                                const SizedBox(height: 8),
                                Container(
                                  padding: const EdgeInsets.all(16),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFFFFFBEB),
                                    borderRadius: BorderRadius.circular(18),
                                    border: Border.all(color: const Color(0xFFFDE68A), width: 1.5),
                                  ),
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Row(
                                        children: [
                                          const Icon(
                                            Icons.auto_awesome_rounded,
                                            color: Color(0xFFD97706),
                                            size: 18,
                                          ),
                                          const SizedBox(width: 6),
                                          Expanded(
                                            child: Text(
                                              ((tipBox['title'] ?? 'Önemli İpucu') as String).toUpperCase(),
                                              style: const TextStyle(
                                                fontSize: 12,
                                                fontWeight: FontWeight.w900,
                                                color: Color(0xFF92400E),
                                                letterSpacing: 0.5,
                                              ),
                                            ),
                                          ),
                                        ],
                                      ),
                                      const SizedBox(height: 6),
                                      SelectableText(
                                        (tipBox['text'] ?? '') as String,
                                        style: const TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.w700,
                                          color: Color(0xFF78350F),
                                          height: 1.45,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ],
                            ],
                          ),
                        );
                      }),

                      if (conclusion.isNotEmpty) ...[
                        Container(
                          padding: const EdgeInsets.all(18),
                          decoration: BoxDecoration(
                            color: const Color(0xFFF3F4F6),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: const Color(0xFFE5E7EB)),
                          ),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              const Text(
                                'Sonuç ve Özet',
                                style: TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.w900,
                                  color: Color(0xFF111827),
                                ),
                              ),
                              const SizedBox(height: 8),
                              SelectableText(
                                conclusion,
                                style: const TextStyle(
                                  fontSize: 14.5,
                                  fontWeight: FontWeight.w700,
                                  color: Color(0xFF374151),
                                  height: 1.5,
                                ),
                              ),
                            ],
                          ),
                        ),
                        const SizedBox(height: 24),
                      ],

                      if (faqs.isNotEmpty) ...[
                        Row(
                          children: const [
                            Icon(Icons.help_outline_rounded, color: Color(0xFF059669), size: 22),
                            SizedBox(width: 8),
                            Text(
                              'Sıkça Sorulan Sorular',
                              style: TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF111827),
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        ...faqs.map((faq) {
                          final q = (faq['question'] ?? '') as String;
                          final a = (faq['answer'] ?? '') as String;
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(18),
                                border: Border.all(color: const Color(0xFFE5E7EB), width: 1.5),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    q,
                                    style: const TextStyle(
                                      fontSize: 15,
                                      fontWeight: FontWeight.w900,
                                      color: Color(0xFF111827),
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                  SelectableText(
                                    a,
                                    style: const TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.w600,
                                      color: Color(0xFF4B5563),
                                      height: 1.45,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        }),
                      ],
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      );
    },
  );
}

class _InfoModuleBody extends StatelessWidget {
  const _InfoModuleBody();

  Future<Map<String, dynamic>> _loadData(BuildContext context) async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/${locale}/info.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      return json.decode(jsonString);
    } catch (e) {
      final fallbackString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/info.json');
      return json.decode(fallbackString);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _loadData(context),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final data = snapshot.data!;
        final featuredTitle = data['featuredTitle'] ?? '';
        final featuredContent = data['featuredContent'] ?? '';
        final List<dynamic> sections = data['sections'] ?? [];

        final categories = sections.map((s) => _ModuleSection(
          title: s['title'] ?? '',
          description: s['description'] ?? '',
          content: s['content'] ?? '',
        )).toList();

        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SectionCard(
              title: AppLocalizations.of(context)!.moduleLabelFeaturedGuide,
              subtitle: featuredTitle,
              onTap: () => _openDetail(context, featuredTitle, featuredContent),
              showReadMore: true,
            ),
            const SizedBox(height: 16),
            Text(AppLocalizations.of(context)!.moduleLabelCategories, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            ...categories.map(
              (c) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _SectionCard(
                  title: c.title,
                  subtitle: c.description,
                  onTap: () => _openDetail(context, c.title, c.content),
                  showReadMore: true,
                ),
              ),
            ),
          ],
        );
      }
    );
  }
}

class _OsbModuleBody extends StatelessWidget {
  const _OsbModuleBody();

  Future<Map<String, dynamic>> _loadData(BuildContext context) async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/' + locale + '/osb.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      return json.decode(jsonString);
    } catch (e) {
      final fallbackString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/osb.json');
      return json.decode(fallbackString);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _loadData(context),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final data = snapshot.data!;
        final featuredTitle = data['featuredTitle'] ?? '';
        final featuredContent = data['featuredContent'] ?? '';
        final sources = data['sources'] ?? '';
        final labels = data['labels'] ?? {};
        final List<dynamic> sections = data['sections'] ?? [];

        final categories = sections.map((s) => _ModuleSection(
          title: s['title'] ?? '',
          description: s['description'] ?? '',
          content: s['content'] ?? '',
        )).toList();

        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SectionCard(
              title: AppLocalizations.of(context)!.moduleLabelFeaturedGuide,
              subtitle: featuredTitle,
              onTap: () => _openDetail(context, featuredTitle, featuredContent),
              showReadMore: true,
            ),
            const SizedBox(height: 16),
            Text(AppLocalizations.of(context)!.moduleLabelCategories, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            ...categories.map(
              (c) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _SectionCard(
                  title: c.title,
                  subtitle: c.description,
                  onTap: () => _openDetail(context, c.title, c.content),
                  showReadMore: true,
                ),
              ),
            ),
            if (sources.isNotEmpty) ...[
              const SizedBox(height: 16),
              _SectionCard(
                title: labels['sources'] ?? 'Kaynaklar',
                subtitle: labels['sourcesDesc'] ?? 'Bilgi amaçlı bağlantılar',
                onTap: () => _openDetail(context, labels['sources'] ?? 'Kaynaklar', sources),
                showReadMore: true,
              ),
            ],
          ],
        );
      }
    );
  }
}

class _OsbResearchModuleBody extends StatelessWidget {
  const _OsbResearchModuleBody();

  Future<Map<String, dynamic>> _loadData(BuildContext context) async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/' + locale + '/osb_research.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      return json.decode(jsonString);
    } catch (e) {
      final fallbackString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/osb_research.json');
      return json.decode(fallbackString);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _loadData(context),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final data = snapshot.data!;
        final featuredTitle = data['featuredTitle'] ?? '';
        final featuredContent = data['featuredContent'] ?? '';
        final labels = data['labels'] ?? {};
        final List<dynamic> sections = data['sections'] ?? [];

        final categories = sections.map((s) => _ModuleSection(
          title: s['title'] ?? '',
          description: s['description'] ?? '',
          content: s['content'] ?? '',
        )).toList();

        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SectionCard(
              title: AppLocalizations.of(context)!.moduleLabelFeaturedGuide,
              subtitle: featuredTitle,
              onTap: () => _openDetail(context, featuredTitle, featuredContent),
              showReadMore: true,
            ),
            const SizedBox(height: 16),
            Text(AppLocalizations.of(context)!.moduleLabelCategories, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            ...categories.map(
              (c) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _SectionCard(
                  title: c.title,
                  subtitle: c.description,
                  onTap: () => _openDetail(context, c.title, c.content),
                  showReadMore: true,
                ),
              ),
            ),
          ],
        );
      }
    );
  }
}

class _EducationModuleBody extends StatelessWidget {
  const _EducationModuleBody();

  Future<Map<String, dynamic>> _loadData(BuildContext context) async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/' + locale + '/education.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      return json.decode(jsonString);
    } catch (e) {
      final fallbackString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/education.json');
      return json.decode(fallbackString);
    }
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder<Map<String, dynamic>>(
      future: _loadData(context),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return const Center(child: CircularProgressIndicator());
        }
        final data = snapshot.data!;
        final featuredTitle = data['featuredTitle'] ?? '';
        final featuredContent = data['featuredContent'] ?? '';
        final labels = data['labels'] ?? {};
        final List<dynamic> sections = data['sections'] ?? [];

        final categories = sections.map((s) => _ModuleSection(
          title: s['title'] ?? '',
          description: s['description'] ?? '',
          content: s['content'] ?? '',
        )).toList();

        return ListView(
          padding: const EdgeInsets.all(16),
          children: [
            _SectionCard(
              title: AppLocalizations.of(context)!.moduleLabelFeaturedGuide,
              subtitle: featuredTitle,
              onTap: () => _openDetail(context, featuredTitle, featuredContent),
              showReadMore: true,
            ),
            const SizedBox(height: 16),
            Text(AppLocalizations.of(context)!.moduleLabelCategories, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800)),
            const SizedBox(height: 12),
            ...categories.map(
              (c) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: _SectionCard(
                  title: c.title,
                  subtitle: c.description,
                  onTap: () => _openDetail(context, c.title, c.content),
                  showReadMore: true,
                ),
              ),
            ),
          ],
        );
      }
    );
  }
}

class _EmotionsModuleBody extends StatefulWidget {
  const _EmotionsModuleBody();

  @override
  State<_EmotionsModuleBody> createState() => _EmotionsModuleBodyState();
}

class _EmotionsModuleBodyState extends State<_EmotionsModuleBody> {
  final _rand = Random();
  String? _selectedEmotion;
  int _intensity = 3;
  final Set<String> _triggers = {};
  final Set<String> _helps = {};
  final _antecedentCtrl = TextEditingController();
  final _behaviorCtrl = TextEditingController();
  final _consequenceCtrl = TextEditingController();
  final _noteCtrl = TextEditingController();

  final List<_EmotionLogEntry> _log = [];
  bool _loaded = false;

  List<String> _triggerOptions = [];
  List<String> _helpOptions = [];
  List<({String name, String emoji, Color color})> _emotions = [];
  bool _jsonLoaded = false;

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _loadJsonData();
  }

  Future<void> _loadJsonData() async {
    if (_jsonLoaded) return;
    final locale = Localizations.localeOf(context).languageCode;
    try {
      final jsonStr = await DefaultAssetBundle.of(context).loadString('assets/content/$locale/emotions.json');
      final data = json.decode(jsonStr) as Map<String, dynamic>;

      final listEmotions = data['emotions'] as List;
      final parsedEmotions = listEmotions.map((item) {
        final colorStr = item['color'] as String;
        final colorVal = int.parse(colorStr);
        return (
          name: item['name'] as String,
          emoji: item['emoji'] as String,
          color: Color(colorVal),
        );
      }).toList();

      final listTriggers = (data['triggers'] as List).cast<String>();
      final listHelps = (data['helps'] as List).cast<String>();

      setState(() {
        _emotions = parsedEmotions;
        _triggerOptions = listTriggers;
        _helpOptions = listHelps;
        _jsonLoaded = true;
      });
    } catch (e) {
      debugPrint("Error loading emotions: $e");
    }
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('emotions_log_v1.json');
    if (!mounted) return;
    if (raw is List) {
      final next = <_EmotionLogEntry>[];
      for (final item in raw) {
        if (item is Map<String, dynamic>) {
          final parsed = _EmotionLogEntry.fromJson(item);
          if (parsed != null) next.add(parsed);
        } else if (item is Map) {
          final parsed = _EmotionLogEntry.fromJson(item.map((k, v) => MapEntry('$k', v)));
          if (parsed != null) next.add(parsed);
        }
      }
      setState(() {
        _log
          ..clear()
          ..addAll(next);
        _loaded = true;
      });
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    final payload = _log.map((e) => e.toJson()).toList(growable: false);
    await LocalStore.instance.writeJson('emotions_log_v1.json', payload);
  }

  @override
  void dispose() {
    _antecedentCtrl.dispose();
    _behaviorCtrl.dispose();
    _consequenceCtrl.dispose();
    _noteCtrl.dispose();
    super.dispose();
  }

  void _toggle(Set<String> set, String value) {
    setState(() {
      if (set.contains(value)) {
        set.remove(value);
      } else {
        set.add(value);
      }
    });
  }

  void _save() {
    final emotion = _selectedEmotion;
    if (emotion == null) return;
    setState(() {
      _log.insert(
        0,
        _EmotionLogEntry(
          id: 'e-${DateTime.now().millisecondsSinceEpoch}-${_rand.nextInt(1 << 20)}',
          at: DateTime.now(),
          emotion: emotion,
          intensity: _intensity,
          triggers: _triggers.toList(growable: false),
          antecedent: _antecedentCtrl.text.trim(),
          behavior: _behaviorCtrl.text.trim(),
          consequence: _consequenceCtrl.text.trim(),
          note: _noteCtrl.text.trim(),
          helped: _helps.toList(growable: false),
        ),
      );
      _intensity = 3;
      _triggers.clear();
      _helps.clear();
      _antecedentCtrl.clear();
      _behaviorCtrl.clear();
      _consequenceCtrl.clear();
      _noteCtrl.clear();
    });
    Future.microtask(_persist);
  }

  @override
  Widget build(BuildContext context) {
    if (! _jsonLoaded) {
      return const Center(child: CircularProgressIndicator());
    }

    final loc = AppLocalizations.of(context)!;
    final disabled = _selectedEmotion == null;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (!_loaded)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: LinearProgressIndicator(),
          ),
        Text(loc.emotionsChoose, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: _emotions.map((e) {
            final selected = _selectedEmotion == e.name;
            return SizedBox(
              width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
              child: InkWell(
                borderRadius: BorderRadius.circular(18),
                onTap: () => setState(() => _selectedEmotion = e.name),
                child: Ink(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: selected ? const Color(0xFF111827) : const Color(0xFFE4E4E7), width: 2),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(14),
                    child: Row(
                      children: [
                        Container(
                          width: 44,
                          height: 44,
                          decoration: BoxDecoration(color: e.color, borderRadius: BorderRadius.circular(14)),
                          alignment: Alignment.center,
                          child: Text(e.emoji, style: const TextStyle(fontSize: 22)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(child: Text(e.name, style: const TextStyle(fontWeight: FontWeight.w900))),
                      ],
                    ),
                  ),
                ),
              ),
            );
          }).toList(),
        ),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(18),
            side: const BorderSide(color: Color(0xFFE4E4E7)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(loc.emotionsDiary, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
                    ),
                    OutlinedButton(
                      onPressed: disabled
                          ? null
                          : () {
                              _openDetail(context, loc.emotionsCalming, loc.emotionsCalmingInstructions);
                            },
                      child: Text(loc.emotionsCalming),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                Text(loc.emotionsSelected(_selectedEmotion ?? '-'), style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 10),
                Text(loc.emotionsIntensity, style: const TextStyle(fontWeight: FontWeight.w800)),
                Slider(
                  value: _intensity.toDouble(),
                  min: 1,
                  max: 5,
                  divisions: 4,
                  label: '$_intensity',
                  onChanged: disabled ? null : (v) => setState(() => _intensity = v.round()),
                ),
                const SizedBox(height: 10),
                Text(loc.emotionsTriggers, style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _triggerOptions
                      .map(
                        (t) => FilterChip(
                          label: Text(t, style: const TextStyle(fontWeight: FontWeight.w800)),
                          selected: _triggers.contains(t),
                          onSelected: disabled ? null : (_) => _toggle(_triggers, t),
                        ),
                      )
                      .toList(),
                ),
                const SizedBox(height: 12),
                Text(loc.emotionsWhatHelped, style: const TextStyle(fontWeight: FontWeight.w800)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: _helpOptions
                      .map(
                        (h) => FilterChip(
                          label: Text(h, style: const TextStyle(fontWeight: FontWeight.w800)),
                          selected: _helps.contains(h),
                          onSelected: disabled ? null : (_) => _toggle(_helps, h),
                        ),
                      )
                      .toList(),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: _antecedentCtrl,
                  enabled: !disabled,
                  decoration: InputDecoration(labelText: loc.emotionsAntecedent, border: const OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _behaviorCtrl,
                  enabled: !disabled,
                  decoration: InputDecoration(labelText: loc.emotionsBehavior, border: const OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _consequenceCtrl,
                  enabled: !disabled,
                  decoration: InputDecoration(labelText: loc.emotionsConsequence, border: const OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 10),
                TextField(
                  controller: _noteCtrl,
                  enabled: !disabled,
                  decoration: InputDecoration(labelText: loc.emotionsNote, border: const OutlineInputBorder()),
                  maxLines: 2,
                ),
                const SizedBox(height: 12),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton.icon(
                    onPressed: disabled ? null : _save,
                    icon: const Icon(Icons.save),
                    label: Text(loc.btnSave),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Text(loc.emotionsRecentLogs, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        const SizedBox(height: 12),
        if (_log.isEmpty)
          Text(loc.emotionsNoLogs, style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF52525B)))
        else
          ..._log.take(12).map(
                (e) => Padding(
                  padding: const EdgeInsets.only(bottom: 12),
                  child: _SectionCard(
                    title: '${e.emotion} (${e.intensity}/5)',
                    subtitle: '${_formatDateTimeTr(e.at)}${e.note.isNotEmpty ? ' • ${e.note}' : ''}',
                    onTap: () => _openDetail(context, e.emotion, e.toLongText(context)),
                  ),
                ),
              ),
      ],
    );
  }
}

class _StoriesModuleBody extends StatefulWidget {
  const _StoriesModuleBody();

  @override
  State<_StoriesModuleBody> createState() => _StoriesModuleBodyState();
}

class _StoriesModuleBodyState extends State<_StoriesModuleBody> {
  _Story? _selected;
  int _step = 0;
  String? _quizChoice;
  final FlutterTts _flutterTts = FlutterTts();
  List<_Story> _stories = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_loaded) {
      _initTts();
      _loadStories();
    }
  }

  void _initTts() async {
    try {
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'tr' ? 'tr-TR' : 'en-US');
      await _flutterTts.setSpeechRate(0.45);
      await _flutterTts.setPitch(1.0);
    } catch (_) {}
  }

  Future<void> _loadStories() async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/' + locale + '/stories.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      final List<dynamic> list = json.decode(jsonString);
      setState(() {
        _stories = list.map((item) {
          final stepsList = item['steps'] as List<dynamic>;
          final stepsParsed = stepsList.map((s) {
            return (emoji: s['emoji'] as String, text: s['text'] as String);
          }).toList();
          return _Story(
            id: item['id'] as String,
            title: item['title'] as String,
            description: item['description'] as String,
            steps: stepsParsed,
          );
        }).toList();
        _loaded = true;
      });
    } catch (e) {
      final trString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/stories.json');
      final List<dynamic> list = json.decode(trString);
      setState(() {
        _stories = list.map((item) {
          final stepsList = item['steps'] as List<dynamic>;
          final stepsParsed = stepsList.map((s) {
            return (emoji: s['emoji'] as String, text: s['text'] as String);
          }).toList();
          return _Story(
            id: item['id'] as String,
            title: item['title'] as String,
            description: item['description'] as String,
            steps: stepsParsed,
          );
        }).toList();
        _loaded = true;
      });
    }
  }

  void _speak(String text) async {
    try {
      await _flutterTts.stop();
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'en' ? 'en-US' : 'tr-TR');
      await _flutterTts.speak(text);
    } catch (_) {}
  }

  @override
  void dispose() {
    _flutterTts.stop();
    super.dispose();
  }

  void _openStory(_Story s) {
    setState(() {
      _selected = s;
      _step = 0;
      _quizChoice = null;
    });
    _speak(s.steps[0].text);
  }

  void _back() {
    setState(() {
      if (_step > 0) {
        _step -= 1;
        _quizChoice = null;
        _speak(_selected!.steps[_step].text);
      } else {
        _flutterTts.stop();
        _selected = null;
        _step = 0;
        _quizChoice = null;
      }
    });
  }

  void _next() {
    final s = _selected;
    if (s == null) return;
    setState(() {
      if (_step >= s.steps.length - 1) {
        _flutterTts.stop();
        _selected = null;
        _step = 0;
        _quizChoice = null;
      } else {
        _step += 1;
        _quizChoice = null;
        _speak(s.steps[_step].text);
      }
    });
  }

  final List<List<Color>> _storyGradients = const [
    [Color(0xFF3B82F6), Color(0xFF60A5FA)], // Blue
    [Color(0xFFEC4899), Color(0xFFF43F5E)], // Pink
    [Color(0xFF10B981), Color(0xFF34D399)], // Green
    [Color(0xFFF59E0B), Color(0xFFFBBF24)], // Amber
    [Color(0xFF8B5CF6), Color(0xFFA78BFA)], // Purple
    [Color(0xFF06B6D4), Color(0xFF22D3EE)], // Cyan
  ];

  @override
  Widget build(BuildContext context) {
    if (!_loaded) {
      return const Center(child: CircularProgressIndicator());
    }

    final s = _selected;
    final loc = AppLocalizations.of(context)!;
    if (s == null) {
      return ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Text(loc.storySelect, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
          const SizedBox(height: 12),
          ..._stories.map(
            (st) {
              final idx = _stories.indexOf(st);
              final grad = _storyGradients[idx % _storyGradients.length];
              return Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Card(
                  margin: EdgeInsets.zero,
                  elevation: 0,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(24),
                  ),
                  child: InkWell(
                    onTap: () => _openStory(st),
                    borderRadius: BorderRadius.circular(24),
                    child: Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: grad,
                        ),
                        borderRadius: BorderRadius.circular(24),
                        boxShadow: [
                          BoxShadow(
                            color: grad.first.withOpacity(0.2),
                            blurRadius: 10,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      padding: const EdgeInsets.all(20),
                      child: Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: Colors.white.withOpacity(0.2),
                              borderRadius: BorderRadius.circular(16),
                            ),
                            child: const Icon(Icons.auto_stories, color: Colors.white, size: 28),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  st.title,
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w900,
                                    color: Colors.white,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  st.description,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w600,
                                    color: Colors.white.withOpacity(0.9),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const Icon(Icons.chevron_right, color: Colors.white, size: 24),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            },
          ),
        ],
      );
    }

    final step = s.steps[_step];
    final options = _quizOptionsFor(s);
    final progress = '${_step + 1}/${s.steps.length}';
    final activeIdx = _stories.indexOf(s);
    final grad = _storyGradients[activeIdx != -1 ? (activeIdx % _storyGradients.length) : 0];
    final themeColor = grad.first;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          children: [
            IconButton(onPressed: _back, icon: const Icon(Icons.arrow_back)),
            Expanded(child: Text(s.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900))),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: themeColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(20),
              ),
              child: Text(progress, style: TextStyle(fontWeight: FontWeight.w900, color: themeColor)),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: BorderSide(color: themeColor.withOpacity(0.2), width: 2),
          ),
          child: Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                Container(
                  width: 120,
                  height: 120,
                  decoration: BoxDecoration(
                    color: themeColor.withOpacity(0.1),
                    shape: BoxShape.circle,
                    border: Border.all(color: themeColor.withOpacity(0.2), width: 4),
                  ),
                  alignment: Alignment.center,
                  child: Text(step.emoji, style: const TextStyle(fontSize: 64)),
                ),
                const SizedBox(height: 16),
                Text(
                  step.text,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF1E293B),
                  ),
                ),
                const SizedBox(height: 16),
                InkWell(
                  onTap: () => _speak(step.text),
                  borderRadius: BorderRadius.circular(30),
                  child: Ink(
                    width: 56,
                    height: 56,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(colors: grad),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: themeColor.withOpacity(0.3),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: const Icon(Icons.volume_up, color: Colors.white, size: 28),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Card(
          elevation: 0,
          color: const Color(0xFFF8FAFC),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: const BorderSide(color: Color(0xFFE2E8F0)),
          ),
          child: Padding(
            padding: const EdgeInsets.all(18),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  loc.storyQuestion,
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w900, color: themeColor),
                ),
                const SizedBox(height: 6),
                Text(
                  loc.storyQuizQ,
                  style: const TextStyle(fontWeight: FontWeight.w800, color: Color(0xFF475569)),
                ),
                const SizedBox(height: 12),
                ...options.map((opt) {
                  final selected = _quizChoice == opt;
                  final isCorrect = opt == s.title;
                  Color btnBg = Colors.white;
                  Color btnBorder = const Color(0xFFE2E8F0);
                  Color textCol = const Color(0xFF1E293B);

                  if (selected) {
                    if (isCorrect) {
                      btnBg = const Color(0xFFDCFCE7);
                      btnBorder = const Color(0xFF22C55E);
                      textCol = const Color(0xFF15803D);
                    } else {
                      btnBg = const Color(0xFFFEE2E2);
                      btnBorder = const Color(0xFFEF4444);
                      textCol = const Color(0xFFB91C1C);
                    }
                  }

                  return Padding(
                    padding: const EdgeInsets.only(bottom: 10),
                    child: OutlinedButton(
                      onPressed: () {
                        setState(() => _quizChoice = opt);
                        if (isCorrect) {
                          _speak(loc.storyQuizCorrect);
                        } else {
                          _speak(loc.storyQuizWrong);
                        }
                      },
                      style: OutlinedButton.styleFrom(
                        side: BorderSide(color: btnBorder, width: 2),
                        padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 16),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                        backgroundColor: btnBg,
                      ),
                      child: Row(
                        children: [
                          Expanded(
                            child: Text(
                              opt,
                              style: TextStyle(fontWeight: FontWeight.w900, color: textCol),
                            ),
                          ),
                          if (selected)
                            Icon(
                              isCorrect ? Icons.check_circle : Icons.cancel,
                              color: isCorrect ? const Color(0xFF22C55E) : const Color(0xFFEF4444),
                            ),
                        ],
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: OutlinedButton(
                onPressed: _back,
                style: OutlinedButton.styleFrom(
                  side: BorderSide(color: themeColor, width: 2),
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                ),
                child: Text(loc.btnBack, style: TextStyle(fontWeight: FontWeight.w900, color: themeColor)),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: ElevatedButton(
                onPressed: _next,
                style: ElevatedButton.styleFrom(
                  backgroundColor: themeColor,
                  foregroundColor: Colors.white,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  elevation: 0,
                ),
                child: Text(
                  _step >= s.steps.length - 1 ? loc.btnFinish : loc.btnNext,
                  style: const TextStyle(fontWeight: FontWeight.w900),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  List<String> _quizOptionsFor(_Story story) {
    final others = _stories.where((s) => s.id != story.id).toList(growable: false);
    final pool = others.take(2).map((s) => s.title).toList(growable: false);
    return <String>[story.title, ...pool]..shuffle(Random(story.id.hashCode));
  }
}


class _MusicModuleBody extends StatefulWidget {
  const _MusicModuleBody();

  @override
  State<_MusicModuleBody> createState() => _MusicModuleBodyState();
}

class _MusicModuleBodyState extends State<_MusicModuleBody> {
  Timer? _timer;
  _MusicTrack? _now;
  int _remaining = 0;
  final AudioPlayer _audioPlayer = AudioPlayer();
  List<_MusicTrack> _tracks = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_loaded) {
      _loadTracks();
    }
  }

  Future<void> _loadTracks() async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/' + locale + '/music.json';
    try {
      final jsonString = await DefaultAssetBundle.of(context).loadString(path);
      final List<dynamic> list = json.decode(jsonString);
      setState(() {
        _tracks = list.map((item) => _MusicTrack(
          title: item['title'] as String,
          duration: item['duration'] as String,
          category: item['category'] as String,
          categoryKey: item['categoryKey'] as String,
          description: item['description'] as String,
          url: item['url'] as String,
        )).toList();
        _loaded = true;
      });
    } catch (e) {
      final trString = await DefaultAssetBundle.of(context).loadString('assets/content/tr/music.json');
      final List<dynamic> list = json.decode(trString);
      setState(() {
        _tracks = list.map((item) => _MusicTrack(
          title: item['title'] as String,
          duration: item['duration'] as String,
          category: item['category'] as String,
          categoryKey: item['categoryKey'] as String,
          description: item['description'] as String,
          url: item['url'] as String,
        )).toList();
        _loaded = true;
      });
    }
  }

  @override
  void dispose() {
    _timer?.cancel();
    _audioPlayer.dispose();
    super.dispose();
  }

  int _parseDurationToSeconds(String mmss) {
    final parts = mmss.split(':');
    if (parts.length != 2) return 0;
    final m = int.tryParse(parts[0]) ?? 0;
    final s = int.tryParse(parts[1]) ?? 0;
    return m * 60 + s;
  }

  void _start(_MusicTrack t) async {
    _timer?.cancel();
    try {
      await _audioPlayer.stop();
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      if (t.url.startsWith('http://') || t.url.startsWith('https://')) {
        await _audioPlayer.play(UrlSource(t.url));
      } else {
        final cleanAsset = t.url.startsWith('assets/') ? t.url.substring(7) : t.url;
        await _audioPlayer.play(AssetSource(cleanAsset));
      }
    } catch (e) {
      debugPrint("Ses oynatilamadi: $e");
    }
    setState(() {
      _now = t;
      _remaining = _parseDurationToSeconds(t.duration);
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _remaining = max(0, _remaining - 1);
        if (_remaining <= 0) {
          _timer?.cancel();
          _stop();
        }
      });
    });
  }

  void _stop() async {
    _timer?.cancel();
    try {
      await _audioPlayer.stop();
    } catch (_) {}
    setState(() {
      _now = null;
      _remaining = 0;
    });
  }

  String _formatMmSs(int seconds) {
    final m = seconds ~/ 60;
    final s = seconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    if (! _loaded) {
      return const Center(child: CircularProgressIndicator());
    }

    final loc = AppLocalizations.of(context)!;
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(
          loc.musicMainTitle,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 8),
        Text(
          loc.musicMainSubtitle,
          style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF6B7280)),
        ),
        const SizedBox(height: 20),
        ..._tracks.map((t) {
          final isPlaying = _now == t;
          final totalSec = _parseDurationToSeconds(t.duration);
          final progress = totalSec == 0 ? 0.0 : (totalSec - _remaining) / totalSec;

          // Map categories to beautiful modern icons
          final IconData categoryIcon;
          final Color categoryColor;
          switch (t.categoryKey) {
            case 'music':
              categoryIcon = Icons.music_note_rounded;
              categoryColor = const Color(0xFF3B82F6);
              break;
            case 'sleep':
              categoryIcon = Icons.nightlight_round_rounded;
              categoryColor = const Color(0xFF6366F1);
              break;
            case 'calming':
              categoryIcon = Icons.spa_rounded;
              categoryColor = const Color(0xFF10B981);
              break;
            case 'focus':
              categoryIcon = Icons.center_focus_strong_rounded;
              categoryColor = const Color(0xFFF59E0B);
              break;
            default:
              categoryIcon = Icons.audiotrack_rounded;
              categoryColor = const Color(0xFF6B7280);
          }

          return Card(
            elevation: 0,
            margin: const EdgeInsets.only(bottom: 14),
            color: isPlaying ? const Color(0xFFF0FDF4) : Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(20),
              side: BorderSide(
                color: isPlaying ? const Color(0xFF10B981) : const Color(0xFFE4E4E7),
                width: isPlaying ? 2.0 : 1.5,
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: isPlaying
                              ? const Color(0xFFD1FAE5)
                              : categoryColor.withOpacity(0.08),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          categoryIcon,
                          color: isPlaying ? const Color(0xFF047857) : categoryColor,
                          size: 26,
                        ),
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              t.title,
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                color: isPlaying
                                    ? const Color(0xFF065F46)
                                    : const Color(0xFF1F2937),
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              t.category + ' • ' + loc.musicDurationPrefix + ': ' + t.duration,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w800,
                                color: isPlaying
                                    ? const Color(0xFF047857).withOpacity(0.8)
                                    : const Color(0xFF6B7280),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      // Play/Stop Action Button directly on the card
                      isPlaying
                          ? ElevatedButton.icon(
                              onPressed: _stop,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFFFECDD3),
                                foregroundColor: const Color(0xFF9F1239),
                                elevation: 0,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                padding: const EdgeInsets.symmetric(
                                  vertical: 10,
                                  horizontal: 14,
                                ),
                              ),
                              icon: const Icon(Icons.stop_rounded, size: 18),
                              label: Text(
                                loc.btnFinish,
                                style: const TextStyle(fontWeight: FontWeight.w900),
                              ),
                            )
                          : OutlinedButton.icon(
                              onPressed: () => _start(t),
                              style: OutlinedButton.styleFrom(
                                side: const BorderSide(
                                  color: Color(0xFFE4E4E7),
                                  width: 1.5,
                                ),
                                foregroundColor: const Color(0xFF1F2937),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(14),
                                ),
                                padding: const EdgeInsets.symmetric(
                                  vertical: 10,
                                  horizontal: 14,
                                ),
                              ),
                              icon: const Icon(
                                Icons.play_arrow_rounded,
                                color: Color(0xFF10B981),
                                size: 18,
                              ),
                              label: Text(
                                loc.btnStart,
                                style: const TextStyle(fontWeight: FontWeight.w900),
                              ),
                            ),
                    ],
                  ),
                  if (isPlaying) ...[
                    const SizedBox(height: 14),
                    ClipRRect(
                      borderRadius: BorderRadius.circular(8),
                      child: LinearProgressIndicator(
                        value: progress,
                        minHeight: 6,
                        backgroundColor: const Color(0xFFD1FAE5),
                        color: const Color(0xFF10B981),
                      ),
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          loc.musicTimeRemaining + ' ' + _formatMmSs(_remaining),
                          style: const TextStyle(
                            fontSize: 13,
                            fontWeight: FontWeight.w900,
                            color: Color(0xFF047857),
                          ),
                        ),
                        Row(
                          children: [
                            const SizedBox(
                              width: 8,
                              height: 8,
                              child: CircularProgressIndicator(
                                strokeWidth: 2,
                                color: Color(0xFF10B981),
                              ),
                            ),
                            const SizedBox(width: 6),
                            Text(
                              loc.musicPlaying,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w900,
                                color: Color(0xFF047857),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                  const SizedBox(height: 10),
                  const Divider(height: 1, color: Color(0xFFF4F4F5)),
                  const SizedBox(height: 8),
                  Text(
                    t.description,
                    style: TextStyle(
                      fontSize: 12.5,
                      fontStyle: FontStyle.italic,
                      fontWeight: FontWeight.w700,
                      color: isPlaying
                          ? const Color(0xFF047857).withOpacity(0.8)
                          : const Color(0xFF6B7280),
                    ),
                  ),
                ],
              ),
            ),
          );
        }),
      ],
    );
  }
}

class _AccModuleBody extends StatefulWidget {
  const _AccModuleBody();

  @override
  State<_AccModuleBody> createState() => _AccModuleBodyState();
}

class _AccModuleBodyState extends State<_AccModuleBody> with SingleTickerProviderStateMixin {
  late final TabController _tabs;
  String _message = '';
  String _activeEmoji = '🗣️';
  String? _pressedLabel;
  final List<String> _sentence = [];
  bool _loaded = false;

  Future<void> _speak(String text) async {
    await _speakGameText(text);
  }

  List<_AccCategory> _getCategories(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return [
      _AccCategory(
        title: loc.accCatNeeds,
        emoji: '🧃',
        color: const Color(0xFF0284C7),
        cards: [
          _AccCard(
            label: loc.accLabelWater,
            emoji: '🥤',
            badgeEmoji: '💧',
            sceneIcon: Icons.water_drop_rounded,
            gradientColors: const [Color(0xFF38BDF8), Color(0xFF0284C7)],
            accentColor: const Color(0xFF0369A1),
          ),
          _AccCard(
            label: loc.accLabelHungry,
            emoji: '🍽️',
            badgeEmoji: '🍎',
            sceneIcon: Icons.restaurant_rounded,
            gradientColors: const [Color(0xFFFB923C), Color(0xFFEA580C)],
            accentColor: const Color(0xFFC2410C),
          ),
          _AccCard(
            label: loc.accLabelToilet,
            emoji: '🚽',
            badgeEmoji: '🧼',
            sceneIcon: Icons.clean_hands_rounded,
            gradientColors: const [Color(0xFF22D3EE), Color(0xFF0891B2)],
            accentColor: const Color(0xFF0E7490),
          ),
          _AccCard(
            label: loc.accLabelSleepy,
            emoji: '🛌',
            badgeEmoji: '🌙',
            sceneIcon: Icons.bedtime_rounded,
            gradientColors: const [Color(0xFF818CF8), Color(0xFF4F46E5)],
            accentColor: const Color(0xFF3730A3),
          ),
          _AccCard(
            label: loc.accLabelBreak,
            emoji: '🛋️',
            badgeEmoji: '⏸️',
            sceneIcon: Icons.pause_circle_filled_rounded,
            gradientColors: const [Color(0xFF34D399), Color(0xFF059669)],
            accentColor: const Color(0xFF047857),
          ),
          _AccCard(
            label: loc.accLabelHelp,
            emoji: '🙋',
            badgeEmoji: '🆘',
            sceneIcon: Icons.support_rounded,
            gradientColors: const [Color(0xFFFBBF24), Color(0xFFD97706)],
            accentColor: const Color(0xFFB45309),
          ),
          _AccCard(
            label: loc.accLabelHug,
            emoji: '🤗',
            badgeEmoji: '💖',
            sceneIcon: Icons.favorite_rounded,
            gradientColors: const [Color(0xFFFB7185), Color(0xFFE11D48)],
            accentColor: const Color(0xFFBE123C),
          ),
        ],
      ),
      _AccCategory(
        title: loc.accCatEmotions,
        emoji: '😊',
        color: const Color(0xFFD97706),
        cards: [
          _AccCard(
            label: loc.accLabelHappy,
            emoji: '😄',
            badgeEmoji: '☀️',
            sceneIcon: Icons.wb_sunny_rounded,
            gradientColors: const [Color(0xFFFBBF24), Color(0xFFF59E0B)],
            accentColor: const Color(0xFFB45309),
          ),
          _AccCard(
            label: loc.accLabelSad,
            emoji: '😢',
            badgeEmoji: '🌧️',
            sceneIcon: Icons.cloud_rounded,
            gradientColors: const [Color(0xFF60A5FA), Color(0xFF2563EB)],
            accentColor: const Color(0xFF1D4ED8),
          ),
          _AccCard(
            label: loc.accLabelScared,
            emoji: '😨',
            badgeEmoji: '⚡',
            sceneIcon: Icons.shield_rounded,
            gradientColors: const [Color(0xFFA855F7), Color(0xFF7E22CE)],
            accentColor: const Color(0xFF6B21A8),
          ),
          _AccCard(
            label: loc.accLabelExcited,
            emoji: '🤩',
            badgeEmoji: '🎉',
            sceneIcon: Icons.celebration_rounded,
            gradientColors: const [Color(0xFFFB923C), Color(0xFFF43F5E)],
            accentColor: const Color(0xFFBE123C),
          ),
          _AccCard(
            label: loc.accLabelAngry,
            emoji: '😠',
            badgeEmoji: '💢',
            sceneIcon: Icons.local_fire_department_rounded,
            gradientColors: const [Color(0xFFF87171), Color(0xFFDC2626)],
            accentColor: const Color(0xFFB91C1C),
          ),
          _AccCard(
            label: loc.accLabelCalm,
            emoji: '😌',
            badgeEmoji: '🌿',
            sceneIcon: Icons.spa_rounded,
            gradientColors: const [Color(0xFF34D399), Color(0xFF059669)],
            accentColor: const Color(0xFF047857),
          ),
          _AccCard(
            label: loc.accLabelTired,
            emoji: '🥱',
            badgeEmoji: '😴',
            sceneIcon: Icons.nights_stay_rounded,
            gradientColors: const [Color(0xFF94A3B8), Color(0xFF475569)],
            accentColor: const Color(0xFF334155),
          ),
          _AccCard(
            label: loc.accLabelSurprised,
            emoji: '😲',
            badgeEmoji: '✨',
            sceneIcon: Icons.auto_awesome_rounded,
            gradientColors: const [Color(0xFFC084FC), Color(0xFF7C3AED)],
            accentColor: const Color(0xFF5B21B6),
          ),
        ],
      ),
      _AccCategory(
        title: loc.accCatActions,
        emoji: '🏃',
        color: const Color(0xFF059669),
        cards: [
          _AccCard(
            label: loc.accLabelGoHome,
            emoji: '🏡',
            badgeEmoji: '❤️',
            sceneIcon: Icons.home_rounded,
            gradientColors: const [Color(0xFF34D399), Color(0xFF059669)],
            accentColor: const Color(0xFF047857),
          ),
          _AccCard(
            label: loc.accLabelGoOut,
            emoji: '👟',
            badgeEmoji: '🌤️',
            sceneIcon: Icons.directions_walk_rounded,
            gradientColors: const [Color(0xFFFB7185), Color(0xFFE11D48)],
            accentColor: const Color(0xFFBE123C),
          ),
          _AccCard(
            label: loc.accLabelDress,
            emoji: '👕',
            badgeEmoji: '👖',
            sceneIcon: Icons.checkroom_rounded,
            gradientColors: const [Color(0xFF38BDF8), Color(0xFF0284C7)],
            accentColor: const Color(0xFF0369A1),
          ),
          _AccCard(
            label: loc.accLabelGoPark,
            emoji: '🛝',
            badgeEmoji: '🌳',
            sceneIcon: Icons.park_rounded,
            gradientColors: const [Color(0xFFFBBF24), Color(0xFFD97706)],
            accentColor: const Color(0xFFB45309),
          ),
          _AccCard(
            label: loc.accLabelGoSchool,
            emoji: '🏫',
            badgeEmoji: '🎒',
            sceneIcon: Icons.school_rounded,
            gradientColors: const [Color(0xFF818CF8), Color(0xFF4F46E5)],
            accentColor: const Color(0xFF3730A3),
          ),
          _AccCard(
            label: loc.accLabelPlayMusic,
            emoji: '🎧',
            badgeEmoji: '🎵',
            sceneIcon: Icons.music_note_rounded,
            gradientColors: const [Color(0xFFC084FC), Color(0xFF9333EA)],
            accentColor: const Color(0xFF6B21A8),
          ),
          _AccCard(
            label: loc.accLabelPlayGame,
            emoji: '🎮',
            badgeEmoji: '🧸',
            sceneIcon: Icons.sports_esports_rounded,
            gradientColors: const [Color(0xFF22D3EE), Color(0xFF0284C7)],
            accentColor: const Color(0xFF0369A1),
          ),
          _AccCard(
            label: loc.accLabelLookCalendar,
            emoji: '📅',
            badgeEmoji: '⭐',
            sceneIcon: Icons.calendar_month_rounded,
            gradientColors: const [Color(0xFFFB923C), Color(0xFFEA580C)],
            accentColor: const Color(0xFFC2410C),
          ),
        ],
      ),
      _AccCategory(
        title: loc.accCatComm,
        emoji: '💬',
        color: const Color(0xFF7C3AED),
        cards: [
          _AccCard(
            label: loc.accLabelMe,
            emoji: '🙋‍♂️',
            badgeEmoji: '⭐',
            sceneIcon: Icons.person_rounded,
            gradientColors: const [Color(0xFF60A5FA), Color(0xFF2563EB)],
            accentColor: const Color(0xFF1D4ED8),
          ),
          _AccCard(
            label: loc.accLabelPlease,
            emoji: '🙏',
            badgeEmoji: '✨',
            sceneIcon: Icons.volunteer_activism_rounded,
            gradientColors: const [Color(0xFFFBBF24), Color(0xFFD97706)],
            accentColor: const Color(0xFFB45309),
          ),
          _AccCard(
            label: loc.accLabelThanks,
            emoji: '🥰',
            badgeEmoji: '💝',
            sceneIcon: Icons.favorite_rounded,
            gradientColors: const [Color(0xFFF472B6), Color(0xFFDB2777)],
            accentColor: const Color(0xFF9D174D),
          ),
          _AccCard(
            label: loc.accLabelYes,
            emoji: '👍',
            badgeEmoji: '✅',
            sceneIcon: Icons.check_circle_rounded,
            gradientColors: const [Color(0xFF34D399), Color(0xFF059669)],
            accentColor: const Color(0xFF047857),
          ),
          _AccCard(
            label: loc.accLabelNo,
            emoji: '🙅',
            badgeEmoji: '❌',
            sceneIcon: Icons.cancel_rounded,
            gradientColors: const [Color(0xFFFB7185), Color(0xFFE11D48)],
            accentColor: const Color(0xFFBE123C),
          ),
          _AccCard(
            label: loc.accLabelPhone,
            emoji: '📱',
            badgeEmoji: '📞',
            sceneIcon: Icons.phone_in_talk_rounded,
            gradientColors: const [Color(0xFF2DD4BF), Color(0xFF0D9488)],
            accentColor: const Color(0xFF0F766E),
          ),
        ],
      ),
    ];
  }

  String _findEmojiForLabel(String label, List<_AccCategory> categories) {
    for (final cat in categories) {
      for (final card in cat.cards) {
        if (card.label == label) return card.emoji;
      }
    }
    return '💬';
  }

  @override
  void initState() {
    super.initState();
    _tabs = TabController(length: 4, vsync: this);
    _tabs.addListener(() {
      if (_tabs.indexIsChanging) return;
      if (mounted) setState(() {});
      Future.microtask(_persist);
    });
    Future.microtask(_load);
  }

  @override
  void dispose() {
    _tabs.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('acc_v1.json');
    if (!mounted) return;
    if (raw is Map) {
      final map = raw.map((k, v) => MapEntry('$k', v));
      final msg = map['message'];
      final sentence = map['sentence'];
      final tabIndex = map['tabIndex'];
      setState(() {
        _message = msg is String ? msg : '';
        _sentence
          ..clear()
          ..addAll(sentence is List ? sentence.whereType<String>() : const <String>[]);
        _loaded = true;
      });
      if (tabIndex is int && tabIndex >= 0 && tabIndex < _tabs.length) {
        WidgetsBinding.instance.addPostFrameCallback((_) {
          if (!mounted) return;
          _tabs.index = tabIndex;
        });
      }
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    await LocalStore.instance.writeJson('acc_v1.json', {
      'message': _message,
      'sentence': _sentence,
      'tabIndex': _tabs.index,
    });
  }

  void _tapCard(_AccCard c) {
    HapticFeedback.mediumImpact();
    setState(() {
      _message = c.label;
      _activeEmoji = c.emoji;
      _pressedLabel = c.label;
      _sentence.add(c.label);
    });
    _speak(c.label);
    Timer(const Duration(milliseconds: 220), () {
      if (mounted) {
        setState(() => _pressedLabel = null);
      }
    });
    Future.microtask(_persist);
  }

  void _clear() {
    HapticFeedback.lightImpact();
    setState(() {
      _message = '';
      _activeEmoji = '🗣️';
      _sentence.clear();
    });
    Future.microtask(_persist);
  }

  @override
  Widget build(BuildContext context) {
    final sentenceText = _sentence.isEmpty ? '…' : '${_sentence.join(' ')}.';
    final categories = _getCategories(context);
    final loc = AppLocalizations.of(context)!;
    final displayEmoji = _message.isEmpty ? '🗣️' : _findEmojiForLabel(_message, categories);

    return Container(
      color: const Color(0xFFF3F4F6),
      child: Column(
        children: [
          if (!_loaded) const LinearProgressIndicator(),
          // Top Communication Board Header
          Container(
            padding: const EdgeInsets.fromLTRB(16, 12, 16, 14),
            decoration: BoxDecoration(
              color: Colors.white,
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.05),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // Active Spoken Card Display
                InkWell(
                  borderRadius: BorderRadius.circular(22),
                  onTap: _message.isEmpty ? null : () => _speak(_message),
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFFFFFBEB), Color(0xFFFEF3C7)],
                      ),
                      borderRadius: BorderRadius.circular(22),
                      border: Border.all(color: const Color(0xFFF59E0B), width: 2.5),
                      boxShadow: [
                        BoxShadow(
                          color: const Color(0xFFF59E0B).withOpacity(0.16),
                          blurRadius: 8,
                          offset: const Offset(0, 3),
                        ),
                      ],
                    ),
                    child: Row(
                      children: [
                        Container(
                          width: 52,
                          height: 52,
                          alignment: Alignment.center,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(16),
                            border: Border.all(color: const Color(0xFFFDE68A), width: 2),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withOpacity(0.06),
                                blurRadius: 6,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: Text(displayEmoji, style: const TextStyle(fontSize: 30)),
                        ),
                        const SizedBox(width: 12),
                        Expanded(
                          child: Text(
                            _message.isEmpty ? loc.accPlaceholderCard : _message,
                            style: TextStyle(
                              fontSize: _message.isEmpty ? 16 : 20,
                              fontWeight: FontWeight.w900,
                              color: _message.isEmpty ? const Color(0xFF92400E) : const Color(0xFF111827),
                              height: 1.15,
                            ),
                          ),
                        ),
                        if (_message.isNotEmpty)
                          Container(
                            width: 40,
                            height: 40,
                            decoration: const BoxDecoration(
                              color: Color(0xFFD97706),
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.volume_up_rounded, color: Colors.white, size: 22),
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 10),

                // Visual PECS Sentence Strip
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: const Color(0xFFE2E8F0), width: 1.5),
                  ),
                  child: Row(
                    children: [
                      Expanded(
                        child: _sentence.isEmpty
                            ? Text(
                                'Cümle kurmak için aşağıdaki kartlara dokun…',
                                style: TextStyle(
                                  fontWeight: FontWeight.w700,
                                  fontSize: 13.5,
                                  color: Colors.grey.shade500,
                                ),
                              )
                            : SizedBox(
                                height: 36,
                                child: ListView.separated(
                                  scrollDirection: Axis.horizontal,
                                  itemCount: _sentence.length,
                                  separatorBuilder: (_, __) => const SizedBox(width: 6),
                                  itemBuilder: (context, idx) {
                                    final word = _sentence[idx];
                                    final em = _findEmojiForLabel(word, categories);
                                    return Container(
                                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: Colors.white,
                                        borderRadius: BorderRadius.circular(12),
                                        border: Border.all(color: const Color(0xFFCBD5E1), width: 1.5),
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Text(em, style: const TextStyle(fontSize: 16)),
                                          const SizedBox(width: 5),
                                          Text(
                                            word,
                                            style: const TextStyle(
                                              fontWeight: FontWeight.w900,
                                              fontSize: 13,
                                              color: Color(0xFF1E293B),
                                            ),
                                          ),
                                        ],
                                      ),
                                    );
                                  },
                                ),
                              ),
                      ),
                      const SizedBox(width: 8),
                      if (_sentence.isNotEmpty)
                        ElevatedButton.icon(
                          onPressed: () => _speak(_sentence.join(' ')),
                          icon: const Icon(Icons.volume_up_rounded, size: 18, color: Colors.white),
                          label: Text(
                            loc.accReadSentence,
                            style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 12.5, color: Colors.white),
                          ),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: const Color(0xFFD97706),
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                            minimumSize: Size.zero,
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                            elevation: 0,
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 10),

                // Action Buttons Row
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _clear,
                        icon: const Icon(Icons.delete_outline_rounded, size: 18),
                        label: Text(loc.btnClear, style: const TextStyle(fontWeight: FontWeight.w800)),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFF475569),
                          side: const BorderSide(color: Color(0xFFCBD5E1), width: 1.5),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _sentence.isEmpty
                            ? null
                            : () => _openDetail(context, loc.accSentenceDetailTitle, sentenceText),
                        icon: const Icon(Icons.visibility_rounded, size: 18),
                        label: Text(loc.btnShow, style: const TextStyle(fontWeight: FontWeight.w800)),
                        style: OutlinedButton.styleFrom(
                          foregroundColor: const Color(0xFFD97706),
                          side: BorderSide(
                            color: _sentence.isEmpty ? const Color(0xFFE2E8F0) : const Color(0xFFF59E0B),
                            width: 1.5,
                          ),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          padding: const EdgeInsets.symmetric(vertical: 10),
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),

          // Colorful Category Tabs
          Container(
            color: Colors.white,
            padding: const EdgeInsets.only(bottom: 6),
            child: TabBar(
              controller: _tabs,
              isScrollable: true,
              tabAlignment: TabAlignment.start,
              padding: const EdgeInsets.symmetric(horizontal: 12),
              indicatorSize: TabBarIndicatorSize.tab,
              dividerColor: Colors.transparent,
              indicator: BoxDecoration(
                color: categories[_tabs.index].color,
                borderRadius: BorderRadius.circular(18),
                boxShadow: [
                  BoxShadow(
                    color: categories[_tabs.index].color.withOpacity(0.28),
                    blurRadius: 8,
                    offset: const Offset(0, 3),
                  ),
                ],
              ),
              labelColor: Colors.white,
              unselectedLabelColor: const Color(0xFF475569),
              labelStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13.5),
              unselectedLabelStyle: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13.5),
              tabs: categories
                  .map(
                    (c) => Tab(
                      height: 40,
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 6),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(c.emoji, style: const TextStyle(fontSize: 17)),
                            const SizedBox(width: 6),
                            Text(c.title),
                          ],
                        ),
                      ),
                    ),
                  )
                  .toList(),
            ),
          ),

          // Rich 3D PECS Visual Cards Grid
          Expanded(
            child: TabBarView(
              controller: _tabs,
              children: categories.map((cat) {
                return GridView.count(
                  padding: const EdgeInsets.fromLTRB(16, 14, 16, 24),
                  crossAxisCount: MediaQuery.of(context).size.width >= 720 ? 4 : 2,
                  mainAxisSpacing: 14,
                  crossAxisSpacing: 14,
                  childAspectRatio: 0.96,
                  children: cat.cards.map((c) {
                    final isPressed = _pressedLabel == c.label;
                    final isActive = _message == c.label;
                    return _PlayfulAccCard(
                      card: c,
                      isPressed: isPressed,
                      isActive: isActive,
                      onTap: () => _tapCard(c),
                    );
                  }).toList(),
                );
              }).toList(),
            ),
          ),
        ],
      ),
    );
  }
}

class _PlayfulAccCard extends StatelessWidget {
  final _AccCard card;
  final bool isPressed;
  final bool isActive;
  final VoidCallback onTap;

  const _PlayfulAccCard({
    required this.card,
    required this.isPressed,
    required this.isActive,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return AnimatedScale(
      scale: isPressed ? 0.94 : 1.0,
      duration: const Duration(milliseconds: 150),
      curve: Curves.easeOutBack,
      child: GestureDetector(
        onTap: onTap,
        child: Container(
          decoration: BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: card.gradientColors,
            ),
            borderRadius: BorderRadius.circular(26),
            border: Border.all(
              color: isActive ? Colors.white : Colors.white.withOpacity(0.35),
              width: isActive ? 3.5 : 1.5,
            ),
            boxShadow: [
              // 3D physical tactile bottom lip
              BoxShadow(
                color: card.accentColor,
                blurRadius: 0,
                offset: const Offset(0, 5),
              ),
              BoxShadow(
                color: card.gradientColors.last.withOpacity(0.32),
                blurRadius: 12,
                offset: const Offset(0, 7),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: Stack(
              children: [
                // Decorative glowing background bubble
                Positioned(
                  top: -22,
                  right: -22,
                  child: Container(
                    width: 90,
                    height: 90,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.14),
                      shape: BoxShape.circle,
                    ),
                  ),
                ),
                // Subtle thematic watermark icon
                Positioned(
                  top: 10,
                  left: 10,
                  child: Icon(
                    card.sceneIcon,
                    size: 32,
                    color: Colors.white.withOpacity(0.22),
                  ),
                ),
                // Top-right speaker audio badge
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    padding: const EdgeInsets.all(6),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.25),
                      shape: BoxShape.circle,
                    ),
                    child: const Icon(
                      Icons.volume_up_rounded,
                      size: 16,
                      color: Colors.white,
                    ),
                  ),
                ),

                // Main Content: 3D Illustration Scene + Crisp PECS Bottom Label Plate
                Column(
                  children: [
                    Expanded(
                      child: Center(
                        child: Stack(
                          clipBehavior: Clip.none,
                          children: [
                            // 3D White Squircle Illustration Frame
                            Container(
                              width: 82,
                              height: 82,
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius: BorderRadius.circular(26),
                                border: Border.all(
                                  color: Colors.white.withOpacity(0.9),
                                  width: 3,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.black.withOpacity(0.14),
                                    blurRadius: 12,
                                    offset: const Offset(0, 5),
                                  ),
                                ],
                              ),
                              child: Text(
                                card.emoji,
                                style: const TextStyle(fontSize: 44, height: 1.05),
                              ),
                            ),
                            // Floating Secondary Context Badge Emoji
                            Positioned(
                              right: -8,
                              bottom: -6,
                              child: Container(
                                width: 34,
                                height: 34,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  shape: BoxShape.circle,
                                  border: Border.all(color: card.gradientColors.first, width: 2.5),
                                  boxShadow: [
                                    BoxShadow(
                                      color: Colors.black.withOpacity(0.14),
                                      blurRadius: 6,
                                      offset: const Offset(0, 2),
                                    ),
                                  ],
                                ),
                                child: Text(
                                  card.badgeEmoji,
                                  style: const TextStyle(fontSize: 17, height: 1.0),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                    // Crisp White PECS Label Plate at the bottom
                    Container(
                      width: double.infinity,
                      margin: const EdgeInsets.fromLTRB(8, 0, 8, 8),
                      padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 8),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.08),
                            blurRadius: 4,
                            offset: const Offset(0, 2),
                          ),
                        ],
                      ),
                      child: Text(
                        card.label,
                        textAlign: TextAlign.center,
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 13.5,
                          color: card.accentColor,
                          height: 1.15,
                          letterSpacing: -0.2,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _CalendarModuleBody extends StatefulWidget {
  const _CalendarModuleBody();

  @override
  State<_CalendarModuleBody> createState() => _CalendarModuleBodyState();
}

class _CalendarModuleBodyState extends State<_CalendarModuleBody> {
  final Map<String, Map<String, bool>> _records = {};
  String _selectedDateKey = _toDateKey(DateTime.now());
  int _tokenBalance = 0;
  Timer? _timer;
  int _timerRemaining = 5 * 60;
  bool _timerRunning = false;
  final _customTaskCtrl = TextEditingController();
  final List<_ScheduleItem> _customTasks = [];
  bool _loaded = false;

  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  List<_ScheduleItem> _getTemplate(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return [
      _ScheduleItem(id: 'morning-routine', time: '09:00', task: loc.calendarTaskMorning, category: loc.calendarCatSelfCare),
      _ScheduleItem(id: 'emotion-work', time: '10:30', task: loc.calendarTaskEmotion, category: loc.calendarCatEducation),
      _ScheduleItem(id: 'lunch', time: '12:00', task: loc.calendarTaskLunch, category: loc.calendarCatNutrition),
      _ScheduleItem(id: 'matching-game', time: '14:00', task: loc.calendarTaskMatching, category: loc.calendarCatPlay),
      _ScheduleItem(id: 'garden-time', time: '16:00', task: loc.calendarTaskGarden, category: loc.calendarCatActivity),
    ];
  }

  @override
  void dispose() {
    _timer?.cancel();
    _customTaskCtrl.dispose();
    super.dispose();
  }

  Future<void> _load() async {
    final raw = await LocalStore.instance.readJson('calendar_v1.json');
    if (!mounted) return;
    if (raw is Map) {
      final map = raw.map((k, v) => MapEntry('$k', v));
      final r = map['records'];
      final tb = map['tokenBalance'];
      final sd = map['selectedDateKey'];
      final ct = map['customTasks'];
      final nextRecords = <String, Map<String, bool>>{};
      if (r is Map) {
        for (final e in r.entries) {
          final dayKey = '${e.key}';
          final dayRaw = e.value;
          if (dayRaw is Map) {
            final day = <String, bool>{};
            for (final d in dayRaw.entries) {
              final id = '${d.key}';
              final v = d.value;
              if (v is bool) day[id] = v;
            }
            nextRecords[dayKey] = day;
          }
        }
      }

      final nextCustom = <_ScheduleItem>[];
      if (ct is List) {
        for (final item in ct) {
          if (item is Map) {
            final parsed = _ScheduleItem.fromJson(item.map((k, v) => MapEntry('$k', v)));
            if (parsed != null) nextCustom.add(parsed);
          }
        }
      }

      setState(() {
        _records
          ..clear()
          ..addAll(nextRecords);
        _tokenBalance = tb is int ? tb : 0;
        _selectedDateKey = sd is String && sd.isNotEmpty ? sd : _selectedDateKey;
        _customTasks
          ..clear()
          ..addAll(nextCustom);
        _loaded = true;
      });
      return;
    }
    setState(() => _loaded = true);
  }

  Future<void> _persist() async {
    await LocalStore.instance.writeJson('calendar_v1.json', {
      'records': _records,
      'tokenBalance': _tokenBalance,
      'selectedDateKey': _selectedDateKey,
      'customTasks': _customTasks.map((e) => e.toJson()).toList(growable: false),
    });
  }

  void _toggleDone(String id) {
    setState(() {
      final day = _records[_selectedDateKey] ?? <String, bool>{};
      final next = !(day[id] ?? false);
      day[id] = next;
      _records[_selectedDateKey] = day;
      if (next) {
        _tokenBalance += 1;
      } else {
        _tokenBalance = max(0, _tokenBalance - 1);
      }
    });
    Future.microtask(_persist);
  }

  void _prevDay() {
    setState(() => _selectedDateKey = _addDays(_selectedDateKey, -1));
    Future.microtask(_persist);
  }
  void _nextDay() {
    final today = _toDateKey(DateTime.now());
    final next = _addDays(_selectedDateKey, 1);
    setState(() => _selectedDateKey = next.compareTo(today) > 0 ? today : next);
    Future.microtask(_persist);
  }

  void _startTimer() {
    _timer?.cancel();
    setState(() {
      _timerRunning = true;
    });
    _timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (!mounted) return;
      setState(() {
        _timerRemaining = max(0, _timerRemaining - 1);
        if (_timerRemaining <= 0) {
          _timerRunning = false;
          _timer?.cancel();
        }
      });
    });
  }

  void _pauseTimer() {
    _timer?.cancel();
    setState(() => _timerRunning = false);
  }

  void _resetTimer() {
    _timer?.cancel();
    setState(() {
      _timerRunning = false;
      _timerRemaining = 5 * 60;
    });
  }

  void _addCustomTask() {
    final text = _customTaskCtrl.text.trim();
    if (text.isEmpty) return;
    final loc = AppLocalizations.of(context)!;
    setState(() {
      _customTasks.add(_ScheduleItem(id: 'c-${DateTime.now().millisecondsSinceEpoch}', time: '—', task: text, category: loc.calendarCatCustom));
      _customTaskCtrl.clear();
    });
    Future.microtask(_persist);
  }

  String _formatMmSs(int seconds) {
    final m = seconds ~/ 60;
    final s = seconds % 60;
    return '${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')}';
  }

  @override
  Widget build(BuildContext context) {
    final dayMap = _records[_selectedDateKey] ?? const <String, bool>{};
    final schedule = [..._getTemplate(context), ..._customTasks].map((i) => i.withDone(dayMap[i.id] ?? false)).toList(growable: false);
    final doneCount = schedule.where((s) => s.done).length;
    final total = schedule.length;
    final percent = total == 0 ? 0 : ((doneCount / total) * 100).round();
    final loc = AppLocalizations.of(context)!;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        if (!_loaded)
          const Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: LinearProgressIndicator(),
          ),
        
        // Date Selector Header
        Container(
          decoration: BoxDecoration(
            color: const Color(0xFFF1F5F9),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: const Color(0xFFE2E8F0)),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
          child: Row(
            children: [
              IconButton(
                onPressed: _prevDay,
                icon: const Icon(Icons.chevron_left, color: Color(0xFF0F172A), size: 28),
              ),
              Expanded(
                child: Text(
                  _selectedDateKey,
                  textAlign: TextAlign.center,
                  style: const TextStyle(
                    fontWeight: FontWeight.w900,
                    fontSize: 16,
                    color: Color(0xFF0F172A),
                    letterSpacing: 0.5,
                  ),
                ),
              ),
              IconButton(
                onPressed: _nextDay,
                icon: const Icon(Icons.chevron_right, color: Color(0xFF0F172A), size: 28),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Progress & Tokens Card (Gradient)
        Container(
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFF8B5CF6), Color(0xFF3B82F6)], // Purple/Blue
            ),
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: const Color(0xFF8B5CF6).withOpacity(0.2),
                blurRadius: 10,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.emoji_events, color: Colors.white, size: 24),
                      const SizedBox(width: 8),
                      Text(
                        '${loc.calendarProgressPrefix}: $percent%',
                        style: const TextStyle(fontWeight: FontWeight.w900, color: Colors.white, fontSize: 16),
                      ),
                    ],
                  ),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.stars, color: Colors.white, size: 18),
                        const SizedBox(width: 6),
                        Text(
                          '${loc.calendarTokenBalance}: $_tokenBalance',
                          style: const TextStyle(fontWeight: FontWeight.w900, color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: LinearProgressIndicator(
                  value: total == 0 ? 0 : doneCount / total,
                  minHeight: 12,
                  backgroundColor: Colors.white.withOpacity(0.2),
                  valueColor: const AlwaysStoppedAnimation<Color>(Colors.white),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        // Timer Card (Stopwatch Dashboard style)
        Card(
          elevation: 0,
          color: Colors.white,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
          ),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      loc.calendarTimerTitle,
                      style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Color(0xFF1E293B)),
                    ),
                    const Icon(Icons.timer_outlined, color: Color(0xFF64748B)),
                  ],
                ),
                const SizedBox(height: 12),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  decoration: BoxDecoration(
                    color: const Color(0xFFF8FAFC),
                    borderRadius: BorderRadius.circular(16),
                    border: Border.all(color: const Color(0xFFF1F5F9)),
                  ),
                  child: Text(
                    _formatMmSs(_timerRemaining),
                    style: const TextStyle(
                      fontSize: 36,
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF0F172A),
                      letterSpacing: 2,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: ElevatedButton.icon(
                        onPressed: _timerRunning ? null : _startTimer,
                        icon: const Icon(Icons.play_arrow),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: const Color(0xFF10B981),
                          foregroundColor: Colors.white,
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          elevation: 0,
                        ),
                        label: Text(loc.btnStart, style: const TextStyle(fontWeight: FontWeight.w800)),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _timerRunning ? _pauseTimer : null,
                        icon: const Icon(Icons.pause),
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          foregroundColor: const Color(0xFF64748B),
                        ),
                        label: Text(loc.btnPause, style: const TextStyle(fontWeight: FontWeight.w800)),
                      ),
                    ),
                    const SizedBox(width: 8),
                    Expanded(
                      child: OutlinedButton.icon(
                        onPressed: _resetTimer,
                        icon: const Icon(Icons.refresh),
                        style: OutlinedButton.styleFrom(
                          side: const BorderSide(color: Color(0xFFE2E8F0), width: 1.5),
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                          foregroundColor: const Color(0xFF64748B),
                        ),
                        label: Text(loc.btnReset, style: const TextStyle(fontWeight: FontWeight.w800)),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),

        Text(
          loc.calendarDailySchedule,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF0F172A)),
        ),
        const SizedBox(height: 12),

        // Schedule Checklist Items
        ...schedule.map(
          (s) {
            // Category custom colors
            Color catColor = const Color(0xFF3B82F6); // Blue default
            if (s.category == loc.calendarCatSelfCare) {
              catColor = const Color(0xFFF59E0B); // Amber
            } else if (s.category == loc.calendarCatEducation) {
              catColor = const Color(0xFF8B5CF6); // Purple
            } else if (s.category == loc.calendarCatNutrition) {
              catColor = const Color(0xFF10B981); // Emerald
            } else if (s.category == loc.calendarCatPlay) {
              catColor = const Color(0xFFEC4899); // Pink
            } else if (s.category == loc.calendarCatActivity) {
              catColor = const Color(0xFF06B6D4); // Cyan
            }

            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: Card(
                margin: EdgeInsets.zero,
                elevation: 0,
                color: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                  side: BorderSide(
                    color: s.done ? catColor.withOpacity(0.5) : const Color(0xFFE2E8F0),
                    width: s.done ? 2.0 : 1.5,
                  ),
                ),
                child: InkWell(
                  onTap: () => _toggleDone(s.id),
                  borderRadius: BorderRadius.circular(20),
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      children: [
                        // Left category indicator bar
                        Container(
                          width: 6,
                          height: 48,
                          decoration: BoxDecoration(
                            color: catColor,
                            borderRadius: BorderRadius.circular(3),
                          ),
                        ),
                        const SizedBox(width: 14),
                        // Content
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${s.time} • ${s.task}',
                                style: TextStyle(
                                  fontWeight: FontWeight.w900,
                                  fontSize: 15,
                                  color: s.done ? const Color(0xFF64748B) : const Color(0xFF0F172A),
                                  decoration: s.done ? TextDecoration.lineThrough : null,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                s.category,
                                style: TextStyle(
                                  fontWeight: FontWeight.w800,
                                  fontSize: 12,
                                  color: catColor.withOpacity(0.85),
                                ),
                              ),
                            ],
                          ),
                        ),
                        // Custom Checkbox representation
                        Container(
                          width: 28,
                          height: 28,
                          decoration: BoxDecoration(
                            color: s.done ? catColor : Colors.white,
                            border: Border.all(
                              color: s.done ? catColor : const Color(0xFFCBD5E1),
                              width: 2,
                            ),
                            shape: BoxShape.circle,
                          ),
                          child: s.done
                              ? const Icon(Icons.check, color: Colors.white, size: 18)
                              : null,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
        const SizedBox(height: 12),

        // Add custom task
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: _customTaskCtrl,
                style: const TextStyle(fontWeight: FontWeight.bold),
                decoration: InputDecoration(
                  labelText: loc.calendarAddCustomTaskHint,
                  labelStyle: const TextStyle(fontWeight: FontWeight.bold, color: Color(0xFF64748B)),
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(16)),
                  contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ),
            const SizedBox(width: 12),
            SizedBox(
              height: 48,
              child: ElevatedButton(
                onPressed: _addCustomTask,
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF0284C7),
                  foregroundColor: Colors.white,
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  elevation: 0,
                ),
                child: Text(loc.btnAdd, style: const TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _GamesModuleBody extends StatelessWidget {
  const _GamesModuleBody();

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final games = <_GameItem>[
      _GameItem(
        title: loc.gameTitleEmotions,
        description: loc.gameDescEmotions,
        icon: Icons.emoji_emotions_rounded,
        emoji: '😊',
        previewEmojis: const ['😊', '😢', '😲'],
        gradient: const [Color(0xFFF43F5E), Color(0xFFFB7185)],
        open: () => _pushGame(context, const _EmotionsMatchGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleMatching,
        description: loc.gameDescMatching,
        icon: Icons.grid_view_rounded,
        emoji: '🍎',
        previewEmojis: const ['🍎', '🍌', '🍇'],
        gradient: const [Color(0xFF10B981), Color(0xFF34D399)],
        open: () => _pushGame(context, const _MatchingGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleCounting,
        description: loc.gameDescCounting,
        icon: Icons.calculate_rounded,
        emoji: '🔢',
        previewEmojis: const ['1️⃣', '2️⃣', '3️⃣'],
        gradient: const [Color(0xFFF59E0B), Color(0xFFFBBF24)],
        open: () => _pushGame(context, const _CountingGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleColors,
        description: loc.gameDescColors,
        icon: Icons.palette_rounded,
        emoji: '🎨',
        previewEmojis: const ['🔴', '🔵', '🟢'],
        gradient: const [Color(0xFF8B5CF6), Color(0xFFA78BFA)],
        open: () => _pushGame(context, const _ColorsGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleMemory,
        description: loc.gameDescMemory,
        icon: Icons.auto_awesome_rounded,
        emoji: '🃏',
        previewEmojis: const ['⭐', '🍉', '🍍'],
        gradient: const [Color(0xFF2563EB), Color(0xFF60A5FA)],
        open: () => _pushGame(context, const _MemoryGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleShapes,
        description: loc.gameDescShapes,
        icon: Icons.category_rounded,
        emoji: '🔺',
        previewEmojis: const ['🟣', '🟦', '⭐'],
        gradient: const [Color(0xFF0891B2), Color(0xFF22D3EE)],
        open: () => _pushGame(context, const _ShapesGamePage()),
      ),
      _GameItem(
        title: loc.gameTitleColoring,
        description: loc.gameDescColoring,
        icon: Icons.brush_rounded,
        emoji: '🖌️',
        previewEmojis: const ['🌈', '🖍️', '✨'],
        gradient: const [Color(0xFFD946EF), Color(0xFFF472B6)],
        open: () => _pushGame(context, const _ColoringGamePage()),
      ),
    ];

    return Container(
      color: const Color(0xFFF8FAFC),
      child: ListView(
        padding: const EdgeInsets.fromLTRB(16, 16, 16, 28),
        children: [
          // Child-friendly Hero Banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 18),
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Color(0xFF0284C7), Color(0xFF38BDF8)],
              ),
              borderRadius: BorderRadius.circular(26),
              boxShadow: [
                BoxShadow(
                  color: const Color(0xFF0284C7).withOpacity(0.25),
                  blurRadius: 14,
                  offset: const Offset(0, 6),
                ),
              ],
            ),
            child: Row(
              children: [
                Container(
                  width: 58,
                  height: 58,
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.22),
                    borderRadius: BorderRadius.circular(18),
                    border: Border.all(color: Colors.white.withOpacity(0.4), width: 2),
                  ),
                  alignment: Alignment.center,
                  child: const Text('🎮', style: TextStyle(fontSize: 32)),
                ),
                const SizedBox(width: 14),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        loc.gameSelect,
                        style: const TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                          letterSpacing: -0.3,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text(
                        'Adım adım öğrenmek için tasarlanmış eğlenceli ve sesli oyunlar!',
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: Colors.white.withOpacity(0.92),
                        ),
                      ),
                    ],
                  ),
                ),
                const Text('🌟', style: TextStyle(fontSize: 28)),
              ],
            ),
          ),
          const SizedBox(height: 18),
          ...games.map(
            (g) => Padding(
              padding: const EdgeInsets.only(bottom: 14),
              child: _PlayfulGameCard(game: g),
            ),
          ),
        ],
      ),
    );
  }

  static void _pushGame(BuildContext context, Widget child) {
    Navigator.of(context).push(MaterialPageRoute(builder: (_) => child));
  }
}

class _PlayfulGameCard extends StatelessWidget {
  final _GameItem game;
  const _PlayfulGameCard({required this.game});

  @override
  Widget build(BuildContext context) {
    final primaryColor = game.gradient.first;
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(26),
        boxShadow: [
          BoxShadow(
            color: primaryColor.withOpacity(0.28),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: BorderRadius.circular(26),
        child: InkWell(
          onTap: game.open,
          borderRadius: BorderRadius.circular(26),
          child: Ink(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: game.gradient,
              ),
              borderRadius: BorderRadius.circular(26),
              border: Border.all(
                color: Colors.white.withOpacity(0.35),
                width: 2,
              ),
            ),
            child: Stack(
              children: [
                Positioned(
                  right: -18,
                  top: -18,
                  child: Container(
                    width: 90,
                    height: 90,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white.withOpacity(0.12),
                    ),
                  ),
                ),
                Positioned(
                  left: 60,
                  bottom: -24,
                  child: Container(
                    width: 64,
                    height: 64,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: Colors.white.withOpacity(0.10),
                    ),
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Container(
                        width: 72,
                        height: 72,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(22),
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.10),
                              blurRadius: 8,
                              offset: const Offset(0, 4),
                            ),
                          ],
                        ),
                        alignment: Alignment.center,
                        child: Text(
                          game.emoji,
                          style: const TextStyle(fontSize: 38),
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              game.title,
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                                letterSpacing: -0.3,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              game.description,
                              maxLines: 2,
                              overflow: TextOverflow.ellipsis,
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w700,
                                color: Colors.white.withOpacity(0.95),
                              ),
                            ),
                            const SizedBox(height: 10),
                            Row(
                              children: game.previewEmojis
                                  .map(
                                    (e) => Container(
                                      margin: const EdgeInsets.only(right: 6),
                                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                                      decoration: BoxDecoration(
                                        color: Colors.white.withOpacity(0.24),
                                        borderRadius: BorderRadius.circular(12),
                                      ),
                                      child: Text(e, style: const TextStyle(fontSize: 14)),
                                    ),
                                  )
                                  .toList(),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        width: 46,
                        height: 46,
                        decoration: BoxDecoration(
                          color: Colors.white,
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.black.withOpacity(0.12),
                              blurRadius: 6,
                              offset: const Offset(0, 3),
                            ),
                          ],
                        ),
                        child: Icon(
                          Icons.play_arrow_rounded,
                          color: primaryColor,
                          size: 30,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

const _gameTtsChannel = MethodChannel('com.otizmdestekapp.otizmfarkindalik/tts');
final FlutterTts _fallbackGameTts = FlutterTts();

String _normalizeTurkishTtsText(String input) {
  // Replace standalone uppercase dotless 'I' (U+0049) with Turkish lowercase dotless 'ı' (U+0131)
  // so Android/iOS TTS engines never read 'I' as English "ay"
  var out = input.trim();
  if (out == 'I') return 'ı';
  if (out == 'İ') return 'i';
  out = out.replaceAllMapped(
    RegExp(r'(^|[s"“([])I(?=[s!?,.:;”)]]|$)'),
    (m) => '${m.group(1)}ı',
  );
  return out;
}

Future<void> _speakGameText(String text) async {
  final clean = _normalizeTurkishTtsText(text);
  if (clean.isEmpty) return;
  try {
    await _gameTtsChannel.invokeMethod('speak', {'text': clean});
  } catch (_) {
    try {
      await _fallbackGameTts.setLanguage('tr-TR');
      await _fallbackGameTts.setSpeechRate(0.46);
      await _fallbackGameTts.setPitch(1.0);
      await _fallbackGameTts.stop();
      await _fallbackGameTts.speak(clean);
    } catch (_) {}
  }
}

class _EmotionsMatchGamePage extends StatefulWidget {
  const _EmotionsMatchGamePage();

  @override
  State<_EmotionsMatchGamePage> createState() => _EmotionsMatchGamePageState();
}

class _EmotionsMatchGamePageState extends State<_EmotionsMatchGamePage> {
  final List<_MatchCard> _items = const [
    _MatchCard(id: 'happy', label: 'Mutlu', emoji: '😊'),
    _MatchCard(id: 'sad', label: 'Üzgün', emoji: '😢'),
    _MatchCard(id: 'angry', label: 'Kızgın', emoji: '😠'),
    _MatchCard(id: 'surprised', label: 'Şaşkın', emoji: '😲'),
    _MatchCard(id: 'scared', label: 'Korkmuş', emoji: '😨'),
    _MatchCard(id: 'sleepy', label: 'Uykulu', emoji: '😴'),
  ];

  late List<_MatchCard> _left;
  late List<_MatchCard> _right;

  String? _selectedLeft;
  String? _selectedRight;
  List<String> _matched = [];
  bool _disabled = false;

  @override
  void initState() {
    super.initState();
    _resetGame(announce: true);
  }

  void _resetGame({bool announce = false}) {
    setState(() {
      _left = List.from(_items)..shuffle();
      _right = List.from(_items)..shuffle();
      _selectedLeft = null;
      _selectedRight = null;
      _matched = [];
      _disabled = false;
    });
    if (announce) {
      Future.delayed(const Duration(milliseconds: 250), () {
        if (mounted) _speakGameText('Duyguları eşleştir!');
      });
    }
  }

  String _getEmotionLabel(BuildContext context, String id) {
    final loc = AppLocalizations.of(context)!;
    switch (id) {
      case 'happy':
        return loc.emotionHappy;
      case 'sad':
        return loc.emotionSad;
      case 'angry':
        return loc.emotionAngry;
      case 'surprised':
        return loc.emotionSurprised;
      case 'scared':
        return loc.emotionScared;
      case 'sleepy':
        return loc.emotionSleepy;
      default:
        return id;
    }
  }

  void _handlePick(String side, String id) {
    if (_disabled || _matched.contains(id)) return;
    HapticFeedback.lightImpact();

    final spokenLabel = _getEmotionLabel(context, id);

    setState(() {
      if (side == 'left') {
        _selectedLeft = id;
      } else {
        _selectedRight = id;
      }
    });

    if (_selectedLeft == null || _selectedRight == null) {
      _speakGameText(spokenLabel);
      return;
    }

    if (_selectedLeft == _selectedRight) {
      setState(() {
        _matched.add(_selectedLeft!);
        _selectedLeft = null;
        _selectedRight = null;
      });
      if (_matched.length == _items.length) {
        _speakGameText('$spokenLabel! Tebrikler! Tüm duyguları eşleştirdin!');
      } else {
        _speakGameText('$spokenLabel! Harika!');
      }
    } else {
      _speakGameText('$spokenLabel. Tekrar dene!');
      setState(() => _disabled = true);
      Future.delayed(const Duration(milliseconds: 600), () {
        if (!mounted) return;
        setState(() {
          _selectedLeft = null;
          _selectedRight = null;
          _disabled = false;
        });
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final isDone = _matched.length == _items.length;

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleEmotions,
          style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF0284C7)),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText(isDone ? loc.gameStatusAllMatched : loc.gameStatusMatch),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(
              isDone ? loc.gameStatusAllMatched : loc.gameStatusMatch,
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Row(
                children: [
                  Expanded(
                    child: ListView.builder(
                      itemCount: _left.length,
                      itemBuilder: (context, idx) {
                        final item = _left[idx];
                        final isMatched = _matched.contains(item.id);
                        final isSelected = _selectedLeft == item.id;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: InkWell(
                            onTap: () => _handlePick('left', item.id),
                            borderRadius: BorderRadius.circular(16),
                            child: Ink(
                              height: 64,
                              decoration: BoxDecoration(
                                color: isMatched
                                    ? const Color(0xFFD1FAE5)
                                    : (isSelected ? const Color(0xFFE0F2FE) : Colors.white),
                                border: Border.all(
                                  color: isMatched
                                      ? const Color(0xFF10B981)
                                      : (isSelected ? const Color(0xFF0284C7) : const Color(0xFFE4E4E7)),
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Center(
                                child: Text(item.emoji ?? '', style: const TextStyle(fontSize: 32)),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: ListView.builder(
                      itemCount: _right.length,
                      itemBuilder: (context, idx) {
                        final item = _right[idx];
                        final isMatched = _matched.contains(item.id);
                        final isSelected = _selectedRight == item.id;
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 12),
                          child: InkWell(
                            onTap: () => _handlePick('right', item.id),
                            borderRadius: BorderRadius.circular(16),
                            child: Ink(
                              height: 64,
                              decoration: BoxDecoration(
                                color: isMatched
                                    ? const Color(0xFFD1FAE5)
                                    : (isSelected ? const Color(0xFFE0F2FE) : Colors.white),
                                border: Border.all(
                                  color: isMatched
                                      ? const Color(0xFF10B981)
                                      : (isSelected ? const Color(0xFF0284C7) : const Color(0xFFE4E4E7)),
                                  width: 2,
                                ),
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Center(
                                child: Text(
                                  _getEmotionLabel(context, item.id),
                                  style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
                                ),
                              ),
                            ),
                          ),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            OutlinedButton.icon(
              onPressed: () => _resetGame(announce: true),
              icon: const Icon(Icons.refresh),
              label: Text(loc.btnRestart),
            ),
          ],
        ),
      ),
    );
  }
}

class _MatchingGamePage extends StatefulWidget {
  const _MatchingGamePage();

  @override
  State<_MatchingGamePage> createState() => _MatchingGamePageState();
}

class _MatchingGamePageState extends State<_MatchingGamePage> {
  final _rand = Random();
  static const _items = <({String id, String name, String emoji})>[
    (id: 'apple', name: 'Elma', emoji: '🍎'),
    (id: 'banana', name: 'Muz', emoji: '🍌'),
    (id: 'grape', name: 'Üzüm', emoji: '🍇'),
    (id: 'strawberry', name: 'Çilek', emoji: '🍓'),
    (id: 'orange', name: 'Portakal', emoji: '🍊'),
    (id: 'watermelon', name: 'Karpuz', emoji: '🍉'),
  ];

  late List<_MatchCard> _left;
  late List<_MatchCard> _right;
  String? _pickedLeft;
  String? _pickedRight;
  final Set<String> _solved = {};
  String? _statusKey;

  @override
  void initState() {
    super.initState();
    _reset(announce: true);
  }

  String _fruitNameForId(String id) {
    for (final e in _items) {
      if (e.id == id) return e.name;
    }
    return id;
  }

  void _reset({bool announce = false}) {
    setState(() {
      _left = _items.map((e) => _MatchCard(id: e.id, label: e.emoji)).toList()..shuffle(_rand);
      _right = _items.map((e) => _MatchCard(id: e.id, label: e.emoji)).toList()..shuffle(_rand);
      _pickedLeft = null;
      _pickedRight = null;
      _solved.clear();
      _statusKey = 'gameStatusMatch';
    });
    if (announce) {
      Future.delayed(const Duration(milliseconds: 250), () {
        if (mounted) _speakGameText('Aynı meyveleri bulup eşleştir!');
      });
    }
  }

  void _pickLeft(_MatchCard c) {
    if (_solved.contains(c.id)) return;
    HapticFeedback.lightImpact();
    final name = _fruitNameForId(c.id);
    setState(() {
      _pickedLeft = c.id;
      _tryResolve(name);
    });
  }

  void _pickRight(_MatchCard c) {
    if (_solved.contains(c.id)) return;
    HapticFeedback.lightImpact();
    final name = _fruitNameForId(c.id);
    setState(() {
      _pickedRight = c.id;
      _tryResolve(name);
    });
  }

  void _tryResolve(String latestSpokenName) {
    if (_pickedLeft == null || _pickedRight == null) {
      _speakGameText(latestSpokenName);
      return;
    }
    if (_pickedLeft == _pickedRight) {
      _solved.add(_pickedLeft!);
      _statusKey = 'storyQuizCorrect';
      _pickedLeft = null;
      _pickedRight = null;
      if (_solved.length == _items.length) {
        _statusKey = 'gameStatusAllMatched';
        _speakGameText('$latestSpokenName! Tebrikler! Hepsini eşleştirdin!');
      } else {
        _speakGameText('$latestSpokenName! Harika eşleşme!');
      }
      return;
    }
    _statusKey = 'storyQuizWrong';
    _pickedLeft = null;
    _pickedRight = null;
    _speakGameText('$latestSpokenName. Tekrar dene!');
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final String statusText;
    if (_statusKey == 'gameStatusMatch') {
      statusText = loc.gameStatusMatch;
    } else if (_statusKey == 'storyQuizCorrect') {
      statusText = loc.storyQuizCorrect;
    } else if (_statusKey == 'gameStatusAllMatched') {
      statusText = loc.gameStatusAllMatched;
    } else {
      statusText = loc.storyQuizWrong;
    }

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleMatching,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText(statusText),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text(statusText, textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 12),
            Expanded(
              child: Row(
                children: [
                  Expanded(child: _MatchColumn(items: _left, solved: _solved, pickedId: _pickedLeft, onPick: _pickLeft)),
                  const SizedBox(width: 12),
                  Expanded(child: _MatchColumn(items: _right, solved: _solved, pickedId: _pickedRight, onPick: _pickRight)),
                ],
              ),
            ),
            const SizedBox(height: 12),
            OutlinedButton.icon(
              onPressed: () => _reset(announce: true),
              icon: const Icon(Icons.refresh),
              label: Text(loc.btnRestart),
            ),
          ],
        ),
      ),
    );
  }
}

class _MatchColumn extends StatelessWidget {
  final List<_MatchCard> items;
  final Set<String> solved;
  final String? pickedId;
  final void Function(_MatchCard) onPick;
  const _MatchColumn({required this.items, required this.solved, required this.pickedId, required this.onPick});

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: items.map((c) {
        final isSolved = solved.contains(c.id);
        final isPicked = pickedId == c.id;
        return Padding(
          padding: const EdgeInsets.only(bottom: 12),
          child: InkWell(
            onTap: () => onPick(c),
            borderRadius: BorderRadius.circular(18),
            child: Ink(
              height: 72,
              decoration: BoxDecoration(
                color: isSolved
                    ? const Color(0xFFD1FAE5)
                    : (isPicked ? const Color(0xFFE0F2FE) : Colors.white),
                border: Border.all(
                  color: isSolved
                      ? const Color(0xFF10B981)
                      : (isPicked ? const Color(0xFF0284C7) : const Color(0xFFE4E4E7)),
                  width: 2.0,
                ),
                borderRadius: BorderRadius.circular(18),
              ),
              child: Center(
                child: Text(
                  c.label ?? '',
                  style: const TextStyle(fontSize: 28),
                ),
              ),
            ),
          ),
        );
      }).toList(),
    );
  }
}

class _MemoryGamePage extends StatefulWidget {
  const _MemoryGamePage();

  @override
  State<_MemoryGamePage> createState() => _MemoryGamePageState();
}

class _MemoryGamePageState extends State<_MemoryGamePage> {
  final _rand = Random();
  static const _maxLevel = 3;
  int _level = 1;
  int _moves = 0;
  List<_MemoryCard> _cards = const [];
  final List<int> _flipped = [];
  final Set<int> _solved = {};
  bool _disabled = false;
  bool _previewing = false;
  Timer? _previewTimer;

  static const _emojis = ['🍎', '🍌', '🍇', '🍓', '🍒', '🍉', '🍍', '🍊'];
  static const _emojiNames = <String, String>{
    '🍎': 'Elma',
    '🍌': 'Muz',
    '🍇': 'Üzüm',
    '🍓': 'Çilek',
    '🍒': 'Kiraz',
    '🍉': 'Karpuz',
    '🍍': 'Ananas',
    '🍊': 'Portakal',
  };

  @override
  void initState() {
    super.initState();
    _startLevel(1);
  }

  @override
  void dispose() {
    _previewTimer?.cancel();
    super.dispose();
  }

  void _startLevel(int nextLevel) {
    _previewTimer?.cancel();
    final count = nextLevel == 1 ? 4 : (nextLevel == 2 ? 8 : 12);
    final pool = List<String>.from(_emojis)..shuffle(_rand);
    final selected = pool.take(count ~/ 2).toList();
    final items = <_MemoryCard>[];
    for (int i = 0; i < selected.length; i++) {
      items.add(_MemoryCard(id: items.length, type: '$i', emoji: selected[i]));
      items.add(_MemoryCard(id: items.length, type: '$i', emoji: selected[i]));
    }
    items.shuffle(_rand);
    setState(() {
      _level = nextLevel;
      _cards = items;
      _flipped.clear();
      _solved.clear();
      _disabled = true;
      _moves = 0;
      _previewing = true;
    });
    Future.delayed(const Duration(milliseconds: 250), () {
      if (mounted) {
        _speakGameText('Seviye $nextLevel. Kartlara dikkatlice bak ve yerlerini hatırla!');
      }
    });
    _previewTimer = Timer(const Duration(seconds: 5), () {
      if (!mounted) return;
      setState(() {
        _previewing = false;
        _disabled = false;
      });
      _speakGameText('Şimdi aynı olan kartları bul!');
    });
  }

  void _tap(int index) {
    if (_previewing) return;
    if (_disabled) return;
    if (_solved.contains(index)) return;
    if (_flipped.contains(index)) return;

    HapticFeedback.lightImpact();
    final cardEmoji = _cards[index].emoji;
    final cardName = _emojiNames[cardEmoji] ?? cardEmoji;

    setState(() {
      if (_flipped.length == 1) {
        final first = _flipped[0];
        final second = index;
        _flipped.add(second);
        _disabled = true;
        _moves += 1;

        final firstType = _cards[first].type;
        final secondType = _cards[second].type;
        final isMatch = firstType == secondType;
        if (isMatch) {
          _solved.add(first);
          _solved.add(second);
          _flipped.clear();
          _disabled = false;
          if (_solved.length == _cards.length) {
            _speakGameText('$cardName! Tebrikler! Seviye $_level tamamlandı!');
          } else {
            _speakGameText('$cardName! Harika eşleşme!');
          }
          return;
        }
        _speakGameText(cardName);
        Future.delayed(const Duration(milliseconds: 700), () {
          if (!mounted) return;
          setState(() {
            _flipped.clear();
            _disabled = false;
          });
        });
        return;
      }
      _flipped.add(index);
      _speakGameText(cardName);
    });
  }

  @override
  Widget build(BuildContext context) {
    final solved = _solved.length;
    final total = _cards.length;
    final done = solved == total;
    final hasNext = done && _level < _maxLevel;
    final hasPrev = _level > 1;
    final loc = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleMemory,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText(
              done ? 'Tebrikler! Seviye $_level tamamlandı!' : 'Aynı olan kartları bul!',
            ),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    done
                        ? loc.gameCongratsLevel(_level, _maxLevel)
                        : loc.gameLevelMoves(_level, _maxLevel, _moves),
                    style: const TextStyle(fontWeight: FontWeight.w900),
                  ),
                ),
                if (hasPrev)
                  OutlinedButton(
                    onPressed: () => _startLevel(_level - 1),
                    child: Text(loc.btnPrev),
                  ),
                const SizedBox(width: 10),
                OutlinedButton.icon(
                  onPressed: () => _startLevel(_level),
                  icon: const Icon(Icons.refresh),
                  label: Text(loc.btnTryAgain),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Expanded(
              child: GridView.count(
                crossAxisCount: MediaQuery.of(context).size.width >= 720 ? 6 : (_cards.length <= 4 ? 2 : 4),
                mainAxisSpacing: 10,
                crossAxisSpacing: 10,
                children: List.generate(_cards.length, (i) {
                  final revealed = _previewing || _solved.contains(i) || _flipped.contains(i);
                  return InkWell(
                    borderRadius: BorderRadius.circular(16),
                    onTap: () => _tap(i),
                    child: Ink(
                      decoration: BoxDecoration(
                        color: revealed ? Colors.white : const Color(0xFF111827),
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: const Color(0xFFE4E4E7), width: 2),
                      ),
                      child: Center(
                        child: Text(
                          revealed ? _cards[i].emoji : '❓',
                          style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w900),
                        ),
                      ),
                    ),
                  );
                }),
              ),
            ),
            if (hasNext) ...[
              const SizedBox(height: 12),
              ElevatedButton(
                onPressed: () => _startLevel(_level + 1),
                child: Text(loc.btnNextLevel),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

class _CountingGamePage extends StatefulWidget {
  const _CountingGamePage();

  @override
  State<_CountingGamePage> createState() => _CountingGamePageState();
}

class _CountingGamePageState extends State<_CountingGamePage> {
  final _rand = Random();
  int _target = 3;
  List<int> _options = const [];
  String? _statusKey;

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final t = 1 + _rand.nextInt(9);
    final set = <int>{t};
    while (set.length < 4) {
      set.add(1 + _rand.nextInt(9));
    }
    final opts = set.toList()..shuffle(_rand);
    setState(() {
      _target = t;
      _options = opts;
      _statusKey = 'gameHowMany';
    });
    Future.delayed(const Duration(milliseconds: 220), () {
      if (mounted) {
        _speakGameText('Kaç tane elma var?');
      }
    });
  }

  void _choose(int v) {
    HapticFeedback.lightImpact();
    setState(() {
      if (v == _target) {
        _statusKey = 'storyQuizCorrect';
        _speakGameText('$v! Doğru! Aferin!');
        Future.delayed(const Duration(milliseconds: 1100), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _statusKey = 'storyQuizWrong';
      _speakGameText('$v. Tekrar dene!');
    });
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final String statusText;
    if (_statusKey == 'gameHowMany') {
      statusText = loc.gameHowMany;
    } else if (_statusKey == 'storyQuizCorrect') {
      statusText = loc.storyQuizCorrect;
    } else {
      statusText = loc.storyQuizWrong;
    }

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleCounting,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText('Kaç tane elma var?'),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            InkWell(
              onTap: () => _speakGameText(statusText),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: 4),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Flexible(
                      child: Text(
                        statusText,
                        textAlign: TextAlign.center,
                        style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                      ),
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.volume_up_rounded, size: 20, color: Color(0xFF0284C7)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 12),
            Expanded(
              child: Center(
                child: Wrap(
                  spacing: 10,
                  runSpacing: 10,
                  children: List.generate(
                    _target,
                    (idx) => GestureDetector(
                      onTap: () => _speakGameText('${idx + 1}'),
                      child: const Text('🍎', style: TextStyle(fontSize: 38)),
                    ),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 12,
              runSpacing: 12,
              children: _options
                  .map(
                    (o) => SizedBox(
                      width: (MediaQuery.of(context).size.width - 16 * 2 - 12) / 2,
                      height: 56,
                      child: ElevatedButton(
                        onPressed: () => _choose(o),
                        child: Text('$o', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
                      ),
                    ),
                  )
                  .toList(),
            ),
            const SizedBox(height: 12),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: Text(loc.gameNextQuestion)),
          ],
        ),
      ),
    );
  }
}

class _ColorsGamePage extends StatefulWidget {
  const _ColorsGamePage();

  @override
  State<_ColorsGamePage> createState() => _ColorsGamePageState();
}

class _ColorsGamePageState extends State<_ColorsGamePage> {
  final _rand = Random();
  late _ColorQuestion _q;
  String? _statusKey;

  static const _pool = <_ColorQuestion>[
    _ColorQuestion(name: 'Kırmızı', color: Colors.red),
    _ColorQuestion(name: 'Mavi', color: Colors.blue),
    _ColorQuestion(name: 'Yeşil', color: Colors.green),
    _ColorQuestion(name: 'Sarı', color: Colors.yellow),
    _ColorQuestion(name: 'Mor', color: Colors.purple),
    _ColorQuestion(name: 'Turuncu', color: Colors.orange),
  ];

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final target = _pool[_rand.nextInt(_pool.length)];
    final set = <_ColorQuestion>{target};
    while (set.length < 4) {
      set.add(_pool[_rand.nextInt(_pool.length)]);
    }
    final options = set.toList()..shuffle(_rand);
    setState(() {
      _q = target.copyWith(options: options);
      _statusKey = 'gameSelectCorrectColor';
    });
    Future.delayed(const Duration(milliseconds: 220), () {
      if (mounted) {
        _speakGameText('${target.name} rengini bul');
      }
    });
  }

  void _choose(_ColorQuestion c) {
    HapticFeedback.lightImpact();
    setState(() {
      if (c.name == _q.name) {
        _statusKey = 'storyQuizCorrect';
        _speakGameText('${c.name}! Doğru! Aferin!');
        Future.delayed(const Duration(milliseconds: 1100), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _statusKey = 'storyQuizWrong';
      _speakGameText('${c.name}. Tekrar dene!');
    });
  }

  String _getColorName(BuildContext context, String name) {
    final loc = AppLocalizations.of(context)!;
    switch (name) {
      case 'Kırmızı':
        return loc.colorRed;
      case 'Mavi':
        return loc.colorBlue;
      case 'Yeşil':
        return loc.colorGreen;
      case 'Sarı':
        return loc.colorYellow;
      case 'Mor':
        return loc.colorPurple;
      case 'Turuncu':
        return loc.colorOrange;
      default:
        return name;
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final String statusText;
    if (_statusKey == 'gameSelectCorrectColor') {
      statusText = loc.gameSelectCorrectColor;
    } else if (_statusKey == 'storyQuizCorrect') {
      statusText = loc.storyQuizCorrect;
    } else {
      statusText = loc.storyQuizWrong;
    }
    final targetColorText = _getColorName(context, _q.name);

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleColors,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText('$targetColorText rengini bul'),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            InkWell(
              onTap: () => _speakGameText('$targetColorText rengini bul'),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '${loc.gameTargetColorPrefix}: $targetColorText',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.volume_up_rounded, size: 20, color: Color(0xFF0284C7)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(statusText, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: _q.options.map((o) {
                  return InkWell(
                    borderRadius: BorderRadius.circular(18),
                    onTap: () => _choose(o),
                    child: Ink(
                      decoration: BoxDecoration(color: o.color, borderRadius: BorderRadius.circular(18)),
                    ),
                  );
                }).toList(),
              ),
            ),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: Text(loc.gameNextQuestion)),
          ],
        ),
      ),
    );
  }
}

class _ShapesGamePage extends StatefulWidget {
  const _ShapesGamePage();

  @override
  State<_ShapesGamePage> createState() => _ShapesGamePageState();
}

class _ShapesGamePageState extends State<_ShapesGamePage> {
  final _rand = Random();
  late _ShapeQuestion _q;
  String? _statusKey;

  static const _pool = <_ShapeQuestion>[
    _ShapeQuestion(name: 'Daire', icon: Icons.circle),
    _ShapeQuestion(name: 'Kare', icon: Icons.square),
    _ShapeQuestion(name: 'Üçgen', icon: Icons.change_history),
    _ShapeQuestion(name: 'Yıldız', icon: Icons.star),
    _ShapeQuestion(name: 'Kalp', icon: Icons.favorite),
  ];

  @override
  void initState() {
    super.initState();
    _next();
  }

  void _next() {
    final target = _pool[_rand.nextInt(_pool.length)];
    final set = <_ShapeQuestion>{target};
    while (set.length < 4) {
      set.add(_pool[_rand.nextInt(_pool.length)]);
    }
    final options = set.toList()..shuffle(_rand);
    setState(() {
      _q = target.copyWith(options: options);
      _statusKey = 'gameSelectCorrectShape';
    });
    Future.delayed(const Duration(milliseconds: 220), () {
      if (mounted) {
        _speakGameText('${target.name} şeklini bul');
      }
    });
  }

  void _choose(_ShapeQuestion s) {
    HapticFeedback.lightImpact();
    setState(() {
      if (s.name == _q.name) {
        _statusKey = 'storyQuizCorrect';
        _speakGameText('${s.name}! Doğru! Aferin!');
        Future.delayed(const Duration(milliseconds: 1100), () {
          if (!mounted) return;
          _next();
        });
        return;
      }
      _statusKey = 'storyQuizWrong';
      _speakGameText('${s.name}. Tekrar dene!');
    });
  }

  String _getShapeName(BuildContext context, String name) {
    final loc = AppLocalizations.of(context)!;
    switch (name) {
      case 'Daire':
        return loc.shapeCircle;
      case 'Kare':
        return loc.shapeSquare;
      case 'Üçgen':
        return loc.shapeTriangle;
      case 'Yıldız':
        return loc.shapeStar;
      case 'Kalp':
        return loc.shapeHeart;
      default:
        return name;
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final String statusText;
    if (_statusKey == 'gameSelectCorrectShape') {
      statusText = loc.gameSelectCorrectShape;
    } else if (_statusKey == 'storyQuizCorrect') {
      statusText = loc.storyQuizCorrect;
    } else {
      statusText = loc.storyQuizWrong;
    }
    final targetShapeText = _getShapeName(context, _q.name);

    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameTitleShapes,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.volume_up_rounded, color: Color(0xFF0284C7)),
            onPressed: () => _speakGameText('$targetShapeText şeklini bul'),
          ),
        ],
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            InkWell(
              onTap: () => _speakGameText('$targetShapeText şeklini bul'),
              borderRadius: BorderRadius.circular(12),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Text(
                      '${loc.gameTargetColorPrefix}: $targetShapeText',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                    ),
                    const SizedBox(width: 6),
                    const Icon(Icons.volume_up_rounded, size: 20, color: Color(0xFF0284C7)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 6),
            Text(statusText, style: const TextStyle(fontWeight: FontWeight.w900)),
            const SizedBox(height: 16),
            Expanded(
              child: GridView.count(
                crossAxisCount: 2,
                mainAxisSpacing: 12,
                crossAxisSpacing: 12,
                children: _q.options.map((o) {
                  return InkWell(
                    borderRadius: BorderRadius.circular(18),
                    onTap: () => _choose(o),
                    child: Ink(
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(18),
                        border: Border.all(color: const Color(0xFFE4E4E7), width: 2),
                      ),
                      child: Center(
                        child: Icon(o.icon, size: 72, color: const Color(0xFF111827)),
                      ),
                    ),
                  );
                }).toList(),
              ),
            ),
            OutlinedButton.icon(onPressed: _next, icon: const Icon(Icons.skip_next), label: Text(loc.gameNextQuestion)),
          ],
        ),
      ),
    );
  }
}

class _ColoringGamePage extends StatefulWidget {
  const _ColoringGamePage();

  @override
  State<_ColoringGamePage> createState() => _ColoringGamePageState();
}

class _ColoringGamePageState extends State<_ColoringGamePage> {
  static const _colors = <({String name, Color value})>[
    (name: 'Kırmızı', value: Color(0xFFEF4444)),
    (name: 'Sarı', value: Color(0xFFEAB308)),
    (name: 'Mavi', value: Color(0xFF3B82F6)),
    (name: 'Yeşil', value: Color(0xFF22C55E)),
    (name: 'Mor', value: Color(0xFFA855F7)),
    (name: 'Pembe', value: Color(0xFFEC4899)),
  ];

  Color _selectedColor = const Color(0xFFEF4444);
  String _selectedTrColorName = 'Kırmızı';
  final Map<String, Color> _paintedColors = {
    'circle': Colors.white,
    'square': Colors.white,
    'triangle': Colors.white,
  };

  void _paint(String shapeId, String shapeLabel) {
    HapticFeedback.lightImpact();
    setState(() {
      _paintedColors[shapeId] = _selectedColor;
    });
    _speakGameText('$_selectedTrColorName $shapeLabel');
  }

  void _reset() {
    setState(() {
      _paintedColors['circle'] = Colors.white;
      _paintedColors['square'] = Colors.white;
      _paintedColors['triangle'] = Colors.white;
    });
  }

  String _getColorName(BuildContext context, String name) {
    final loc = AppLocalizations.of(context)!;
    switch (name) {
      case 'Kırmızı':
        return loc.colorRed;
      case 'Mavi':
        return loc.colorBlue;
      case 'Yeşil':
        return loc.colorGreen;
      case 'Sarı':
        return loc.colorYellow;
      case 'Mor':
        return loc.colorPurple;
      case 'Pembe':
        return loc.colorPink;
      default:
        return name;
    }
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Scaffold(
      backgroundColor: const Color(0xFFFFF1F2),
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Color(0xFF0284C7)),
        title: Text(
          loc.gameColoringTitle,
          style: const TextStyle(
            fontWeight: FontWeight.w900,
            letterSpacing: -0.5,
            color: Color(0xFF0284C7),
          ),
        ),
        backgroundColor: Colors.white,
        actions: [
          IconButton(icon: const Icon(Icons.refresh, color: Color(0xFF0284C7)), onPressed: _reset),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            elevation: 0,
            color: Colors.white,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(24),
              side: BorderSide(color: Colors.grey.shade200, width: 1.5),
            ),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.palette, color: Color(0xFFEC4899)),
                      const SizedBox(width: 8),
                      Text(
                        loc.gameColoringSelectColor,
                        style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: _colors.map((c) {
                      final selected = _selectedColor == c.value;
                      final colorLabel = _getColorName(context, c.name);
                      return ChoiceChip(
                        label: Text(
                          colorLabel,
                          style: TextStyle(fontWeight: FontWeight.w800, color: selected ? Colors.white : Colors.black87),
                        ),
                        selected: selected,
                        selectedColor: c.value,
                        backgroundColor: Colors.white,
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(12),
                          side: BorderSide(color: selected ? c.value : Colors.grey.shade300, width: 1.5),
                        ),
                        onSelected: (v) {
                          if (v) {
                            setState(() {
                              _selectedColor = c.value;
                              _selectedTrColorName = colorLabel;
                            });
                            _speakGameText(colorLabel);
                          }
                        },
                      );
                    }).toList(),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          Text(
            loc.gameColoringTapAndPaint,
            style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 16),
          Wrap(
            spacing: 16,
            runSpacing: 16,
            alignment: WrapAlignment.center,
            children: [
              _buildShapeCard(
                label: loc.shapeCircle,
                onTap: () => _paint('circle', loc.shapeCircle),
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: _paintedColors['circle'],
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.grey.shade300, width: 4),
                  ),
                ),
              ),
              _buildShapeCard(
                label: loc.shapeSquare,
                onTap: () => _paint('square', loc.shapeSquare),
                child: Container(
                  width: 80,
                  height: 80,
                  decoration: BoxDecoration(
                    color: _paintedColors['square'],
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: Colors.grey.shade300, width: 4),
                  ),
                ),
              ),
              _buildShapeCard(
                label: loc.shapeTriangle,
                onTap: () => _paint('triangle', loc.shapeTriangle),
                child: SizedBox(
                  width: 80,
                  height: 80,
                  child: CustomPaint(
                    painter: _TrianglePainter(_paintedColors['triangle']!),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildShapeCard({required String label, required VoidCallback onTap, required Widget child}) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        elevation: 0,
        color: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(20),
          side: BorderSide(color: Colors.grey.shade200, width: 1.5),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              child,
              const SizedBox(height: 10),
              Text(label, style: const TextStyle(fontWeight: FontWeight.w800)),
            ],
          ),
        ),
      ),
    );
  }
}

class _TrianglePainter extends CustomPainter {
  final Color color;
  const _TrianglePainter(this.color);

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = color
      ..style = PaintingStyle.fill;
    final path = Path()
      ..moveTo(size.width / 2, 0)
      ..lineTo(size.width, size.height)
      ..lineTo(0, size.height)
      ..close();
    canvas.drawPath(path, paint);

    final borderPaint = Paint()
      ..color = Colors.grey.shade300
      ..style = PaintingStyle.stroke
      ..strokeWidth = 4;
    canvas.drawPath(path, borderPaint);
  }

  @override
  bool shouldRepaint(_TrianglePainter oldDelegate) => oldDelegate.color != color;
}

class _EducationReminderModuleBody extends StatefulWidget {
  const _EducationReminderModuleBody();

  @override
  State<_EducationReminderModuleBody> createState() => _EducationReminderModuleBodyState();
}

class _EducationReminderModuleBodyState extends State<_EducationReminderModuleBody> {
  static const _storageName = 'education_reminders_v1.json';
  static const _baseNotificationId = 9100;

  final _service = NotificationService.instance;

  final _days = <_EducationReminderDay>[
    _EducationReminderDay(weekday: DateTime.monday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.tuesday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.wednesday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.thursday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.friday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.saturday, label: '', message: ''),
    _EducationReminderDay(weekday: DateTime.sunday, label: '', message: ''),
  ];

  bool _loading = true;
  bool _loadedOnce = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_loadedOnce) {
      _loadedOnce = true;
      _load();
    }
  }

  List<String> _getPresets(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return [
      loc.remPresetFloortime,
      loc.remPresetSpeechTherapy,
      loc.remPresetSpecialEducation,
      loc.remPresetErgotherapy,
      loc.remPresetMovement,
      loc.remPresetEmotionWork,
      loc.remPresetSensory,
      loc.remPresetHomework,
      loc.remPresetReading,
      loc.remPresetPlay,
      loc.remPresetStory,
      loc.remPresetImitation,
      loc.remPresetAcc,
      loc.remPresetBreak,
      loc.remPresetWalk,
      loc.remPresetReward,
      loc.remPresetSleepReady,
    ];
  }

  String _getWeekdayLabel(BuildContext context, int weekday) {
    final loc = AppLocalizations.of(context)!;
    switch (weekday) {
      case DateTime.monday:
        return loc.weekdayMonday;
      case DateTime.tuesday:
        return loc.weekdayTuesday;
      case DateTime.wednesday:
        return loc.weekdayWednesday;
      case DateTime.thursday:
        return loc.weekdayThursday;
      case DateTime.friday:
        return loc.weekdayFriday;
      case DateTime.saturday:
        return loc.weekdaySaturday;
      case DateTime.sunday:
        return loc.weekdaySunday;
      default:
        return '';
    }
  }

  int _idForWeekday(int weekday) => _baseNotificationId + weekday;

  String _formatTime(int hour, int minute) {
    final h = hour < 10 ? '0$hour' : '$hour';
    final m = minute < 10 ? '0$minute' : '$minute';
    return '$h:$m';
  }

  Future<void> _load() async {
    try {
      await _service.init();
      if (!mounted) return;
      final loc = AppLocalizations.of(context)!;
      final defaultMsg = loc.remDefaultMessage;

      for (int i = 0; i < _days.length; i++) {
        _days[i] = _days[i].copyWith(message: defaultMsg);
      }

      final raw = await LocalStore.instance.readJson(_storageName);
      if (raw is Map) {
        final daysRaw = raw['days'];
        if (daysRaw is List) {
          for (final item in daysRaw) {
            if (item is! Map) continue;
            final weekday = item['weekday'];
            if (weekday is! int) continue;
            final idx = _days.indexWhere((d) => d.weekday == weekday);
            if (idx < 0) continue;
            final enabled = item['enabled'] == true;
            final hour = item['hour'];
            final minute = item['minute'];
            final message = item['message'];
            _days[idx] = _days[idx].copyWith(
              enabled: enabled,
              hour: hour is int ? hour : _days[idx].hour,
              minute: minute is int ? minute : _days[idx].minute,
              message: message is String && message.trim().isNotEmpty ? message.trim() : _days[idx].message,
            );
          }
        }
      }
    } catch (e) {
      debugPrint('EducationReminder load error: $e');
    }

    if (!mounted) return;
    setState(() {
      _loading = false;
    });
  }

  Future<void> _persist() async {
    final data = {
      'days': _days.map((d) => d.toJson()).toList(),
    };
    await LocalStore.instance.writeJson(_storageName, data);
  }

  Future<void> _apply(_EducationReminderDay d) async {
    final id = _idForWeekday(d.weekday);
    if (!d.enabled) {
      await _service.cancel(id);
      return;
    }

    if (!mounted) return;
    final loc = AppLocalizations.of(context)!;
    final dayName = _getWeekdayLabel(context, d.weekday);
    final timeStr = _formatTime(d.hour, d.minute);
    await _service.scheduleWeekly(
      id: id,
      weekday: d.weekday,
      hour: d.hour,
      minute: d.minute,
      title: loc.moduleTitleEduReminder,
      body: '$dayName $timeStr • ${d.message}',
    );
  }

  void _showSavedFeedback(_EducationReminderDay d) {
    if (!mounted) return;
    final dayName = _getWeekdayLabel(context, d.weekday);
    final timeStr = _formatTime(d.hour, d.minute);
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: const Color(0xFF047857),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        content: Text(
          d.enabled
              ? 'Hatırlatıcı aktif: $dayName $timeStr (${d.message})'
              : '$dayName için hatırlatıcı kapatıldı',
          style: const TextStyle(fontWeight: FontWeight.w800),
        ),
        duration: const Duration(seconds: 2),
      ),
    );
  }

  Future<void> _setEnabled(int index, bool enabled) async {
    HapticFeedback.lightImpact();
    final loc = AppLocalizations.of(context)!;
    if (enabled) {
      final ok = await _service.requestPermissionIfNeeded();
      if (!ok) {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(loc.remPermissionDenied)),
        );
        return;
      }
    }

    setState(() {
      _days[index] = _days[index].copyWith(enabled: enabled);
    });
    await _apply(_days[index]);
    await _persist();
    _showSavedFeedback(_days[index]);
    if (enabled && mounted) {
      final dayName = _getWeekdayLabel(context, _days[index].weekday);
      final timeStr = _formatTime(_days[index].hour, _days[index].minute);
      _speakGameText('$dayName günü saat $timeStr için hatırlatıcı kuruldu');
    }
  }

  Future<void> _pickTime(int index) async {
    final loc = AppLocalizations.of(context)!;
    final current = _days[index];
    final picked = await showTimePicker(
      context: context,
      initialTime: TimeOfDay(hour: current.hour, minute: current.minute),
    );
    if (picked == null) return;

    final ok = await _service.requestPermissionIfNeeded();
    if (!ok) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(loc.remPermissionDenied)),
      );
      return;
    }

    setState(() {
      _days[index] = _days[index].copyWith(enabled: true, hour: picked.hour, minute: picked.minute);
    });
    await _apply(_days[index]);
    await _persist();
    _showSavedFeedback(_days[index]);
    if (mounted) {
      final dayName = _getWeekdayLabel(context, _days[index].weekday);
      final timeStr = _formatTime(picked.hour, picked.minute);
      _speakGameText('$dayName günü saat $timeStr için hatırlatıcı kuruldu');
    }
  }

  Future<void> _pickMessage(int index) async {
    final loc = AppLocalizations.of(context)!;
    final defaultMsg = loc.remDefaultMessage;
    final current = _days[index];
    final presets = _getPresets(context);

    final chosen = await showModalBottomSheet<String>(
      context: context,
      showDragHandle: true,
      builder: (ctx) {
        return SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text(loc.remReminderTextTitle, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
              const SizedBox(height: 10),
              ...presets.map((m) {
                return ListTile(
                  title: Text(m, style: const TextStyle(fontWeight: FontWeight.w800)),
                  onTap: () => Navigator.of(ctx).pop(m),
                );
              }),
              const Divider(),
              ListTile(
                title: Text(loc.remCustom, style: const TextStyle(fontWeight: FontWeight.w900)),
                onTap: () => Navigator.of(ctx).pop('__custom__'),
              ),
            ],
          ),
        );
      },
    );

    if (chosen == null) return;
    if (!mounted) return;

    String nextMessage = chosen;
    if (chosen == '__custom__') {
      final controller = TextEditingController(text: presets.contains(current.message) ? '' : current.message);
      final saved = await showDialog<String>(
        context: context,
        builder: (ctx) {
          return AlertDialog(
            title: Text(loc.remCustomTextTitle),
            content: TextField(
              controller: controller,
              decoration: InputDecoration(hintText: loc.remCustomTextHint),
            ),
            actions: [
              TextButton(onPressed: () => Navigator.of(ctx).pop(null), child: Text(loc.familyBtnCancel)),
              FilledButton(onPressed: () => Navigator.of(ctx).pop(controller.text), child: Text(loc.familyBtnSave)),
            ],
          );
        },
      );
      if (saved == null) return;
      nextMessage = saved.trim().isNotEmpty ? saved.trim() : defaultMsg;
    }

    await _service.requestPermissionIfNeeded();
    setState(() {
      _days[index] = _days[index].copyWith(enabled: true, message: nextMessage);
    });
    await _apply(_days[index]);
    await _persist();
    _showSavedFeedback(_days[index]);
    _speakGameText(nextMessage);
  }

  Future<void> _sendTestNotification() async {
    HapticFeedback.mediumImpact();
    await _service.requestPermissionIfNeeded();
    if (!mounted) return;
    final loc = AppLocalizations.of(context)!;
    await _service.showInstant(
      id: 9199,
      title: loc.moduleTitleEduReminder,
      body: 'Harika! OtiZeka eğitim hatırlatıcı bildirimleriniz sorunsuz çalışıyor.',
    );
    _speakGameText('Test bildirimi gönderildi! Eğitim hatırlatıcıları aktif.');
    if (!mounted) return;
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: const Color(0xFF047857),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        content: const Text(
          'Test bildirimi gönderildi! Bildirim çubuğunu kontrol edin.',
          style: TextStyle(fontWeight: FontWeight.w800),
        ),
      ),
    );
  }

  Future<void> _disableAll() async {
    setState(() {
      for (var i = 0; i < _days.length; i++) {
        _days[i] = _days[i].copyWith(enabled: false);
      }
    });
    for (final d in _days) {
      await _apply(d);
    }
    await _persist();
    if (!mounted) return;
    ScaffoldMessenger.of(context).clearSnackBars();
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        backgroundColor: const Color(0xFF475569),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
        content: const Text(
          'Tüm haftalık hatırlatıcılar kapatıldı.',
          style: TextStyle(fontWeight: FontWeight.w800),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) return const Center(child: CircularProgressIndicator());
    final loc = AppLocalizations.of(context)!;

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Container(
          padding: const EdgeInsets.all(18),
          decoration: BoxDecoration(
            gradient: const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFF047857), Color(0xFF10B981)],
            ),
            borderRadius: BorderRadius.circular(24),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Icon(Icons.notifications_active_rounded, color: Colors.white, size: 28),
                  const SizedBox(width: 10),
                  Expanded(
                    child: Text(
                      loc.remMainTitle,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                loc.remMainSubtitle,
                style: TextStyle(fontWeight: FontWeight.w700, color: Colors.white.withOpacity(0.92), fontSize: 13),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _sendTestNotification,
                  icon: const Icon(Icons.notifications_rounded, size: 18, color: Color(0xFF047857)),
                  label: const Text(
                    'Şimdi Test Bildirimi Gönder',
                    style: TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF047857)),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.white,
                    elevation: 0,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),
        ..._days.asMap().entries.map((e) {
          final index = e.key;
          final d = e.value;
          return Card(
            elevation: 0,
            color: d.enabled ? const Color(0xFFECFDF5) : Colors.white,
            margin: const EdgeInsets.only(bottom: 10),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(18),
              side: BorderSide(
                color: d.enabled ? const Color(0xFF10B981) : const Color(0xFFE4E4E7),
                width: d.enabled ? 2 : 1.2,
              ),
            ),
            child: ListTile(
              title: Text(
                _getWeekdayLabel(context, d.weekday),
                style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
              ),
              subtitle: Text(
                d.enabled
                    ? '${loc.remTimeLabel}: ${_formatTime(d.hour, d.minute)}\n${loc.remTextLabel}: ${d.message}'
                    : '${loc.remOffLabel} • Saat seçmek için dokun (${_formatTime(d.hour, d.minute)})',
                style: TextStyle(
                  fontWeight: FontWeight.w700,
                  color: d.enabled ? const Color(0xFF065F46) : const Color(0xFF6B7280),
                ),
              ),
              isThreeLine: d.enabled,
              leading: Switch(
                value: d.enabled,
                activeColor: const Color(0xFF059669),
                onChanged: (v) => _setEnabled(index, v),
              ),
              trailing: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  IconButton(
                    icon: Icon(
                      Icons.access_time_filled_rounded,
                      color: d.enabled ? const Color(0xFF059669) : const Color(0xFF64748B),
                    ),
                    onPressed: () => _pickTime(index),
                    tooltip: loc.remSelectTimeTooltip,
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.edit_note_rounded,
                      color: d.enabled ? const Color(0xFF059669) : const Color(0xFF64748B),
                    ),
                    onPressed: () => _pickMessage(index),
                    tooltip: loc.remSelectTextTooltip,
                  ),
                ],
              ),
              onTap: () => _pickTime(index),
            ),
          );
        }),
        const SizedBox(height: 6),
        OutlinedButton.icon(
          onPressed: _disableAll,
          icon: const Icon(Icons.notifications_off),
          label: Text(loc.remDisableAll),
        ),
      ],
    );
  }
}

class _EducationReminderDay {
  final int weekday;
  final String label;
  final bool enabled;
  final int hour;
  final int minute;
  final String message;

  const _EducationReminderDay({
    required this.weekday,
    required this.label,
    this.enabled = false,
    this.hour = 9,
    this.minute = 0,
    required this.message,
  });

  _EducationReminderDay copyWith({
    bool? enabled,
    int? hour,
    int? minute,
    String? message,
  }) {
    return _EducationReminderDay(
      weekday: weekday,
      label: label,
      enabled: enabled ?? this.enabled,
      hour: hour ?? this.hour,
      minute: minute ?? this.minute,
      message: message ?? this.message,
    );
  }

  Map<String, dynamic> toJson() => {
        'weekday': weekday,
        'enabled': enabled,
        'hour': hour,
        'minute': minute,
        'message': message,
      };
}

class _ComingSoonBody extends StatelessWidget {
  final String title;
  const _ComingSoonBody({required this.title});

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Text(
          loc.moduleComingSoon(title),
          textAlign: TextAlign.center,
          style: const TextStyle(fontWeight: FontWeight.w700),
        ),
      ),
    );
  }
}

class _ModuleSection {
  final String title;
  final String description;
  final String content;
  const _ModuleSection({required this.title, required this.description, required this.content});
}

class _EmotionLogEntry {
  final String id;
  final DateTime at;
  final String emotion;
  final int intensity;
  final List<String> triggers;
  final String antecedent;
  final String behavior;
  final String consequence;
  final String note;
  final List<String> helped;

  const _EmotionLogEntry({
    required this.id,
    required this.at,
    required this.emotion,
    required this.intensity,
    required this.triggers,
    required this.antecedent,
    required this.behavior,
    required this.consequence,
    required this.note,
    required this.helped,
  });

  Map<String, Object?> toJson() {
    return {
      'id': id,
      'at': at.toIso8601String(),
      'emotion': emotion,
      'intensity': intensity,
      'triggers': triggers,
      'antecedent': antecedent,
      'behavior': behavior,
      'consequence': consequence,
      'note': note,
      'helped': helped,
    };
  }

  static _EmotionLogEntry? fromJson(Map<String, dynamic> json) {
    final atRaw = json['at'];
    final at = atRaw is String ? DateTime.tryParse(atRaw) : null;
    if (at == null) return null;
    final id = json['id'];
    final emotion = json['emotion'];
    final intensity = json['intensity'];
    if (id is! String || emotion is! String || intensity is! int) return null;
    final triggers = (json['triggers'] is List) ? (json['triggers'] as List).whereType<String>().toList() : <String>[];
    final helped = (json['helped'] is List) ? (json['helped'] as List).whereType<String>().toList() : <String>[];
    return _EmotionLogEntry(
      id: id,
      at: at,
      emotion: emotion,
      intensity: intensity,
      triggers: triggers,
      antecedent: (json['antecedent'] is String) ? json['antecedent'] as String : '',
      behavior: (json['behavior'] is String) ? json['behavior'] as String : '',
      consequence: (json['consequence'] is String) ? json['consequence'] as String : '',
      note: (json['note'] is String) ? json['note'] as String : '',
      helped: helped,
    );
  }

  String toLongText(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    final b = StringBuffer();
    b.writeln(loc.emotionsLogDate(_formatDateTimeTr(at)));
    b.writeln(loc.emotionsLogEmotion(emotion));
    b.writeln(loc.emotionsLogIntensity(intensity.toString()));
    if (triggers.isNotEmpty) b.writeln(loc.emotionsLogTriggers(triggers.join(', ')));
    if (helped.isNotEmpty) b.writeln(loc.emotionsLogHelped(helped.join(', ')));
    if (antecedent.isNotEmpty) b.writeln('\n${loc.emotionsLogAntecedent}:\n$antecedent');
    if (behavior.isNotEmpty) b.writeln('\n${loc.emotionsLogBehavior}:\n$behavior');
    if (consequence.isNotEmpty) b.writeln('\n${loc.emotionsLogConsequence}:\n$consequence');
    if (note.isNotEmpty) b.writeln('\n${loc.emotionsLogNote}:\n$note');
    return b.toString().trim();
  }
}

class _Story {
  final String id;
  final String title;
  final String description;
  final List<({String emoji, String text})> steps;
  const _Story({required this.id, required this.title, required this.description, required this.steps});
}

class _MusicTrack {
  final String title;
  final String duration;
  final String category;
  final String categoryKey;
  final String description;
  final String url;
  const _MusicTrack({
    required this.title,
    required this.duration,
    required this.category,
    required this.categoryKey,
    required this.description,
    required this.url,
  });
}

class _AccCategory {
  final String title;
  final String emoji;
  final Color color;
  final List<_AccCard> cards;
  const _AccCategory({
    required this.title,
    required this.emoji,
    required this.color,
    required this.cards,
  });
}

class _AccCard {
  final String label;
  final String emoji;
  final String badgeEmoji;
  final IconData sceneIcon;
  final List<Color> gradientColors;
  final Color accentColor;

  const _AccCard({
    required this.label,
    required this.emoji,
    required this.badgeEmoji,
    required this.sceneIcon,
    required this.gradientColors,
    required this.accentColor,
  });
}

class _ScheduleItem {
  final String id;
  final String time;
  final String task;
  final String category;
  final bool done;
  const _ScheduleItem({
    required this.id,
    required this.time,
    required this.task,
    required this.category,
    this.done = false,
  });

  _ScheduleItem withDone(bool next) => _ScheduleItem(id: id, time: time, task: task, category: category, done: next);

  Map<String, Object?> toJson() => {'id': id, 'time': time, 'task': task, 'category': category};

  static _ScheduleItem? fromJson(Map<String, dynamic> json) {
    final id = json['id'];
    final time = json['time'];
    final task = json['task'];
    final category = json['category'];
    if (id is! String || task is! String) return null;
    return _ScheduleItem(
      id: id,
      time: time is String ? time : '—',
      task: task,
      category: category is String ? category : 'Özel',
    );
  }
}

class _GameItem {
  final String title;
  final String description;
  final IconData icon;
  final String emoji;
  final List<String> previewEmojis;
  final List<Color> gradient;
  final VoidCallback open;
  const _GameItem({
    required this.title,
    required this.description,
    required this.icon,
    required this.emoji,
    required this.previewEmojis,
    required this.gradient,
    required this.open,
  });
}

class _MatchCard {
  final String id;
  final String label;
  final String? emoji;
  const _MatchCard({required this.id, required this.label, this.emoji});
}

class _MemoryCard {
  final int id;
  final String type;
  final String emoji;
  const _MemoryCard({required this.id, required this.type, required this.emoji});
}

class _ColorQuestion {
  final String name;
  final Color color;
  final List<_ColorQuestion> options;
  const _ColorQuestion({required this.name, required this.color, this.options = const []});

  _ColorQuestion copyWith({List<_ColorQuestion>? options}) => _ColorQuestion(name: name, color: color, options: options ?? this.options);

  @override
  bool operator ==(Object other) => other is _ColorQuestion && other.name == name;

  @override
  int get hashCode => name.hashCode;
}

class _ShapeQuestion {
  final String name;
  final IconData icon;
  final List<_ShapeQuestion> options;
  const _ShapeQuestion({required this.name, required this.icon, this.options = const []});

  _ShapeQuestion copyWith({List<_ShapeQuestion>? options}) => _ShapeQuestion(name: name, icon: icon, options: options ?? this.options);

  @override
  bool operator ==(Object other) => other is _ShapeQuestion && other.name == name;

  @override
  int get hashCode => name.hashCode;
}

String _formatMmSs(int seconds) {
  final m = seconds ~/ 60;
  final s = seconds % 60;
  final mm = m < 10 ? '0$m' : '$m';
  final ss = s < 10 ? '0$s' : '$s';
  return '$mm:$ss';
}

String _toDateKey(DateTime date) {
  final y = date.year.toString().padLeft(4, '0');
  final m = date.month.toString().padLeft(2, '0');
  final d = date.day.toString().padLeft(2, '0');
  return '$y-$m-$d';
}

String _addDays(String key, int delta) {
  final parts = key.split('-');
  if (parts.length != 3) return key;
  final y = int.tryParse(parts[0]) ?? 1970;
  final m = int.tryParse(parts[1]) ?? 1;
  final d = int.tryParse(parts[2]) ?? 1;
  final dt = DateTime(y, m, d).add(Duration(days: delta));
  return _toDateKey(dt);
}

String _formatDateTimeTr(DateTime dt) {
  final y = dt.year.toString().padLeft(4, '0');
  final m = dt.month.toString().padLeft(2, '0');
  final d = dt.day.toString().padLeft(2, '0');
  final hh = dt.hour.toString().padLeft(2, '0');
  final mm = dt.minute.toString().padLeft(2, '0');
  return '$d.$m.$y $hh:$mm';
}

class _SectionCard extends StatelessWidget {
  final String title;
  final String subtitle;
  final VoidCallback onTap;
  final bool showReadMore;
  const _SectionCard({
    required this.title,
    required this.subtitle,
    required this.onTap,
    this.showReadMore = false,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 0,
      color: Colors.white,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(18),
        side: const BorderSide(color: Color(0xFFE4E4E7)),
      ),
      child: InkWell(
        borderRadius: BorderRadius.circular(18),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(14),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w900)),
              const SizedBox(height: 6),
              Text(
                subtitle,
                maxLines: 4,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(fontWeight: FontWeight.w700, color: Color(0xFF52525B)),
              ),
              if (showReadMore) ...[
                const SizedBox(height: 8),
                Text(
                  AppLocalizations.of(context)!.moduleLabelReadMore,
                  style: TextStyle(
                    color: Colors.blue,
                    fontWeight: FontWeight.bold,
                    fontSize: 13,
                  ),
                ),
              ],
            ],
          ),
        ),
      ),
    );
  }
}

class _SensoryModuleBody extends StatefulWidget {
  const _SensoryModuleBody();

  @override
  State<_SensoryModuleBody> createState() => _SensoryModuleBodyState();
}

class _SensoryModuleBodyState extends State<_SensoryModuleBody> {
  Color _bgColor = const Color(0xFF0C4A6E);
  final List<_Bubble> _bubbles = [];
  final Random _random = Random();
  final AudioPlayer _audioPlayer = AudioPlayer();

  Future<void> _playSensorySound(String assetOrUrl) async {
    try {
      await _audioPlayer.stop();
      await _audioPlayer.setReleaseMode(ReleaseMode.loop);
      if (assetOrUrl.startsWith('http://') || assetOrUrl.startsWith('https://')) {
        await _audioPlayer.play(UrlSource(assetOrUrl));
      } else {
        await _audioPlayer.play(AssetSource(assetOrUrl));
      }
    } catch (e) {
      debugPrint("Sensory room audio play error: $e");
    }
  }

  @override
  void initState() {
    super.initState();

    // Initial bubbles
    for (int i = 0; i < 15; i++) {
      _addBubble();
    }

    Timer.periodic(const Duration(milliseconds: 500), (timer) {
      if (mounted) {
        setState(() {
          for (var bubble in _bubbles) {
            bubble.y -= bubble.speed;
            if (bubble.y < -100) {
              bubble.y = MediaQuery.of(context).size.height + 100;
              bubble.x = _random.nextDouble() * MediaQuery.of(context).size.width;
            }
          }
        });
      } else {
        timer.cancel();
      }
    });

    _playSensorySound('audio/waves.wav');
  }

  void _addBubble() {
    _bubbles.add(_Bubble(
      x: _random.nextDouble() * 400,
      y: _random.nextDouble() * 800,
      size: _random.nextDouble() * 60 + 20,
      speed: _random.nextDouble() * 2 + 1,
      opacity: _random.nextDouble() * 0.3 + 0.1,
    ));
  }

  @override
  void dispose() {
    _audioPlayer.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final loc = AppLocalizations.of(context)!;
    return GestureDetector(
      onTapDown: (details) {
        setState(() {
          _bubbles.add(_Bubble(
            x: details.localPosition.dx,
            y: details.localPosition.dy,
            size: _random.nextDouble() * 80 + 40,
            speed: 2,
            opacity: 0.5,
          ));
        });
      },
      child: AnimatedContainer(
        duration: const Duration(seconds: 2),
        color: _bgColor,
        child: Stack(
          children: [
            // Bubbles
            ..._bubbles.map((bubble) => Positioned(
                  left: bubble.x - bubble.size / 2,
                  top: bubble.y - bubble.size / 2,
                  child: Opacity(
                    opacity: bubble.opacity,
                    child: Container(
                      width: bubble.size,
                      height: bubble.size,
                      decoration: const BoxDecoration(
                        color: Colors.white,
                        shape: BoxShape.circle,
                        boxShadow: [BoxShadow(color: Colors.white24, blurRadius: 20, spreadRadius: 5)],
                      ),
                    ),
                  ),
                )),

             // Controls
            Positioned(
              bottom: 40,
              left: 20,
              right: 20,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _SensoryButton(
                    icon: Icons.flutter_dash,
                    label: loc.sensoryBirds,
                    isActive: _bgColor == const Color(0xFF14532D),
                    onTap: () {
                      setState(() => _bgColor = const Color(0xFF14532D));
                      _playSensorySound('audio/birds.wav');
                    },
                  ),
                  _SensoryButton(
                    icon: Icons.waves,
                    label: loc.sensorySea,
                    isActive: _bgColor == const Color(0xFF0C4A6E),
                    onTap: () {
                      setState(() => _bgColor = const Color(0xFF0C4A6E));
                      _playSensorySound('audio/waves.wav');
                    },
                  ),
                  _SensoryButton(
                    icon: Icons.forest,
                    label: loc.sensoryForest,
                    isActive: _bgColor == const Color(0xFF064E3B),
                    onTap: () {
                      setState(() => _bgColor = const Color(0xFF064E3B));
                      _playSensorySound('audio/wind.wav');
                    },
                  ),
                  _SensoryButton(
                    icon: Icons.wb_sunny,
                    label: loc.sensorySun,
                    isActive: _bgColor == const Color(0xFF7C2D12),
                    onTap: () {
                      setState(() => _bgColor = const Color(0xFF7C2D12));
                      _playSensorySound('audio/calming_melody.wav');
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _Bubble {
  double x, y, size, speed, opacity;
  _Bubble({required this.x, required this.y, required this.size, required this.speed, required this.opacity});
}

class _SensoryButton extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final VoidCallback onTap;

  const _SensoryButton({required this.icon, required this.label, required this.isActive, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        GestureDetector(
          onTap: onTap,
          child: AnimatedContainer(
            duration: const Duration(milliseconds: 300),
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isActive ? Colors.white : Colors.white10,
              borderRadius: BorderRadius.circular(16),
            ),
            child: Icon(icon, color: isActive ? Colors.black : Colors.white, size: 24),
          ),
        ),
        const SizedBox(height: 4),
        Text(label, style: const TextStyle(color: Colors.white70, fontSize: 10, fontWeight: FontWeight.bold)),
      ],
    );
  }
}

void _openDetail(BuildContext context, String title, String content) {
  showModalBottomSheet<void>(
    context: context,
    isScrollControlled: true,
    showDragHandle: true,
    backgroundColor: Colors.white,
    shape: const RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
    ),
    builder: (context) {
      return SafeArea(
        child: Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
          child: SizedBox(
            height: MediaQuery.of(context).size.height * 0.78,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    IconButton(onPressed: () => Navigator.of(context).pop(), icon: const Icon(Icons.close)),
                  ],
                ),
                const Divider(height: 1),
                const SizedBox(height: 12),
                Expanded(
                  child: SingleChildScrollView(
                    child: SelectableText(
                      content,
                      style: const TextStyle(fontSize: 15, height: 1.5, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    },
  );
}

class _ObjectsModuleBody extends StatefulWidget {
  const _ObjectsModuleBody();

  @override
  State<_ObjectsModuleBody> createState() => _ObjectsModuleBodyState();
}

class _ObjectItem {
  final String name;
  final String emoji;
  const _ObjectItem({required this.name, required this.emoji});
}

class _ObjectCategory {
  final String title;
  final String emoji;
  final Color color;
  final List<_ObjectItem> items;
  const _ObjectCategory({
    required this.title,
    required this.emoji,
    required this.color,
    required this.items,
  });
}

class _ObjectsModuleBodyState extends State<_ObjectsModuleBody> {
  final FlutterTts _flutterTts = FlutterTts();
  List<_ObjectCategory> _categories = [];
  _ObjectCategory? _selectedCategory;
  List<_ObjectItem> _options = [];
  _ObjectItem? _targetItem;
  _ObjectItem? _selectedOption;
  bool _isAnsweredCorrectly = false;
  List<_ObjectItem> _wrongAnswers = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _initTts();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _loadCategories();
  }

  void _initTts() async {
    try {
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'tr' ? 'tr-TR' : 'en-US');
      await _flutterTts.setSpeechRate(0.45);
      await _flutterTts.setPitch(1.0);
    } catch (_) {}
  }

  Future<void> _loadCategories() async {
    final locale = Localizations.localeOf(context).languageCode;
    final path = 'assets/content/$locale/objects.json';
    try {
      final jsonStr = await DefaultAssetBundle.of(context).loadString(path);
      final list = json.decode(jsonStr) as List;
      final parsed = list.map((c) {
        final title = c['title'] as String;
        final emoji = c['emoji'] as String;
        final colorHex = c['color'] as String;
        final color = Color(int.parse(colorHex));
        final itemsList = c['items'] as List;
        final items = itemsList.map((item) {
          return _ObjectItem(
            name: item['name'] as String,
            emoji: item['emoji'] as String,
          );
        }).toList();
        return _ObjectCategory(title: title, emoji: emoji, color: color, items: items);
      }).toList();

      setState(() {
        _categories = parsed;
        _loading = false;
        if (_selectedCategory != null) {
          final matching = _categories.firstWhere(
            (cat) => cat.emoji == _selectedCategory!.emoji,
            orElse: () => _categories.first,
          );
          _selectedCategory = matching;
        }
      });
    } catch (e) {
      debugPrint("Error loading objects.json: $e");
      setState(() => _loading = false);
    }
  }

  void _speak(String text) async {
    await _speakGameText(text);
  }

  void _selectCategory(_ObjectCategory cat) {
    setState(() {
      _selectedCategory = cat;
      _wrongAnswers = [];
      _selectedOption = null;
      _isAnsweredCorrectly = false;
      _setupQuestion();
    });
  }

  void _setupQuestion() {
    if (_selectedCategory == null) return;
    final allItems = List<_ObjectItem>.from(_selectedCategory!.items);
    if (allItems.length < 4) return;

    final rand = Random();
    final chosen = <_ObjectItem>[];
    while (chosen.length < 4) {
      final item = allItems[rand.nextInt(allItems.length)];
      if (!chosen.any((c) => c.name == item.name)) {
        chosen.add(item);
      }
    }

    setState(() {
      _options = chosen;
      _targetItem = chosen[rand.nextInt(chosen.length)];
      _wrongAnswers = [];
      _selectedOption = null;
      _isAnsweredCorrectly = false;
    });

    WidgetsBinding.instance.addPostFrameCallback((_) {
      _speakQuestion();
    });
  }

  void _speakQuestion() {
    if (_targetItem == null) return;
    final loc = AppLocalizations.of(context)!;
    _speak(loc.objectsQuestion(_targetItem!.name));
  }

  void _onOptionSelected(_ObjectItem item) {
    if (_isAnsweredCorrectly) return;
    setState(() {
      _selectedOption = item;
    });

    final loc = AppLocalizations.of(context)!;
    final isTr = Localizations.localeOf(context).languageCode == 'tr';
    if (item.name == _targetItem!.name) {
      setState(() {
        _isAnsweredCorrectly = true;
      });
      _speak(isTr ? 'Evet, doğru! Bu ${item.name}.' : loc.objectsCorrectAnswer(_targetItem!.name));
      HapticFeedback.mediumImpact();
    } else {
      if (!_wrongAnswers.any((w) => w.name == item.name)) {
        setState(() {
          _wrongAnswers.add(item);
        });
      }
      _speak(isTr
          ? 'Hayır, bu ${item.name}. ${_targetItem!.name} hangisi?'
          : 'No, this is ${item.name}. Which one is ${_targetItem!.name}?');
      HapticFeedback.vibrate();
    }
  }

  @override
  void dispose() {
    _flutterTts.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator());
    }
    if (_selectedCategory == null) {
      return _buildCategorySelector();
    }
    return _buildGameBoard();
  }

  Widget _buildCategorySelector() {
    return GridView.builder(
      padding: const EdgeInsets.all(16),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 12,
        mainAxisSpacing: 12,
        childAspectRatio: 0.9,
      ),
      itemCount: _categories.length,
      itemBuilder: (context, idx) {
        final cat = _categories[idx];
        return Card(
          elevation: 0,
          color: cat.color,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(24),
            side: BorderSide(color: Colors.white.withOpacity(0.6), width: 1.5),
          ),
          child: InkWell(
            onTap: () => _selectCategory(cat),
            borderRadius: BorderRadius.circular(24),
            child: Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    cat.emoji,
                    style: const TextStyle(fontSize: 48),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    cat.title,
                    textAlign: TextAlign.center,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontWeight: FontWeight.w900,
                      color: Color(0xFF1F2937),
                      fontSize: 13,
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
  }

  Widget _buildGameBoard() {
    if (_targetItem == null || _options.length < 4) {
      return const Center(child: CircularProgressIndicator());
    }
    final loc = AppLocalizations.of(context)!;

    return Container(
      color: const Color(0xFFF9FAFB),
      child: Column(
        children: [
          // Sub-Header
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: Colors.white,
            child: Row(
              children: [
                IconButton(
                  onPressed: () {
                    setState(() {
                      _selectedCategory = null;
                    });
                  },
                  icon: const Icon(Icons.arrow_back_ios_rounded, color: Color(0xFF4B5563)),
                ),
                Text(
                  _selectedCategory!.title,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w900,
                    color: Color(0xFF1F2937),
                  ),
                ),
                const Spacer(),
                IconButton(
                  onPressed: _speakQuestion,
                  icon: const Icon(Icons.volume_up_rounded, color: Color(0xFFEC4899), size: 30),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // Question Card
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16),
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(28),
              border: Border.all(color: Colors.grey.shade200, width: 1.5),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.02),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Center(
              child: Text(
                loc.objectsQuestion(_targetItem!.name),
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF111827),
                ),
              ),
            ),
          ),
          const SizedBox(height: 24),

          // 4 Grid Options
          Expanded(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: GridView.builder(
                physics: const NeverScrollableScrollPhysics(),
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 16,
                  mainAxisSpacing: 16,
                  childAspectRatio: 1.0,
                ),
                itemCount: 4,
                itemBuilder: (context, idx) {
                  final item = _options[idx];
                  final isWrong = _wrongAnswers.any((w) => w.name == item.name);
                  final isCorrect = _isAnsweredCorrectly && item.name == _targetItem!.name;

                  Color cardBg = Colors.white;
                  Color borderColor = Colors.grey.shade200;
                  double borderWidth = 1.5;

                  if (isCorrect) {
                    cardBg = const Color(0xFFECFDF5);
                    borderColor = const Color(0xFF10B981);
                    borderWidth = 3.0;
                  } else if (isWrong) {
                    cardBg = const Color(0xFFFEF2F2);
                    borderColor = const Color(0xFFEF4444);
                    borderWidth = 2.0;
                  }

                  return Card(
                    elevation: isCorrect ? 4 : 0,
                    color: cardBg,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(32),
                      side: BorderSide(color: borderColor, width: borderWidth),
                    ),
                    child: InkWell(
                      onTap: () => _onOptionSelected(item),
                      borderRadius: BorderRadius.circular(32),
                      child: Stack(
                        alignment: Alignment.center,
                        children: [
                          Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(
                                item.emoji,
                                style: const TextStyle(fontSize: 72),
                              ),
                              if (isCorrect) ...[
                                const SizedBox(height: 8),
                                Text(
                                  item.name,
                                  style: const TextStyle(
                                    fontSize: 18,
                                    fontWeight: FontWeight.w900,
                                    color: Color(0xFF10B981),
                                  ),
                                ),
                              ],
                            ],
                          ),
                          if (isCorrect)
                            const Positioned(
                              top: 12,
                              right: 12,
                              child: CircleAvatar(
                                radius: 14,
                                backgroundColor: Color(0xFF10B981),
                                child: Icon(Icons.check, color: Colors.white, size: 16),
                              ),
                            ),
                          if (isWrong)
                            const Positioned(
                              top: 12,
                              right: 12,
                              child: CircleAvatar(
                                radius: 14,
                                backgroundColor: Color(0xFFEF4444),
                                child: Icon(Icons.close, color: Colors.white, size: 16),
                              ),
                            ),
                        ],
                      ),
                    ),
                  );
                },
              ),
            ),
          ),

          // Success Celebration & Next Button
          if (_isAnsweredCorrectly)
            Padding(
              padding: const EdgeInsets.all(24),
              child: SizedBox(
                width: double.infinity,
                height: 60,
                child: ElevatedButton(
                  onPressed: _setupQuestion,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF10B981),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    elevation: 2,
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.navigate_next_rounded, color: Colors.white, size: 28),
                      const SizedBox(width: 8),
                      Text(
                        loc.objectsNextQuestion,
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w900,
                          color: Colors.white,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            )
          else
            const SizedBox(height: 108),
        ],
      ),
    );
  }
}

class _SentenceSoundsModuleBody extends StatefulWidget {
  const _SentenceSoundsModuleBody();

  @override
  State<_SentenceSoundsModuleBody> createState() => _SentenceSoundsModuleBodyState();
}

class _LetterGameObject {
  final String letter;
  final String emoji;
  final String word;
  const _LetterGameObject({
    required this.letter,
    required this.emoji,
    required this.word,
  });
}

class _SentenceSoundsModuleBodyState extends State<_SentenceSoundsModuleBody> with SingleTickerProviderStateMixin {
  late final TabController _tabController;
  final FlutterTts _flutterTts = FlutterTts();

  // Sounds state
  String? _pressedLetter;

  // Alphabet & Game state
  List<String> _alphabet = [];
  Map<String, _LetterGameObject> _gameObjects = {};
  final List<String> _shuffledLetters = [];
  String? _activeGameLetter;

  // Sentence Builder state
  Map<String, dynamic>? _sbData;
  String? _sentenceWho;
  String? _sentenceWhat;
  String? _sentenceWhere;
  String? _sentenceWhen;
  String? _sentenceVerb;
  bool _loading = true;

  static const _letterColors = <Color>[
    Color(0xFFFEE2E2), // Rose
    Color(0xFFFEF3C7), // Amber
    Color(0xFFD1FAE5), // Emerald
    Color(0xFFDBEAFE), // Blue
    Color(0xFFE0E7FF), // Indigo
    Color(0xFFF3E8FF), // Purple
    Color(0xFFFCE7F3), // Pink
    Color(0xFFE0F2FE), // Sky Blue
    Color(0xFFFFF7ED), // Orange
    Color(0xFFECFDF5), // Mint
  ];

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
    _initTts();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _loadData();
  }

  void _initTts() async {
    try {
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'tr' ? 'tr-TR' : 'en-US');
      await _flutterTts.setSpeechRate(0.45);
      await _flutterTts.setPitch(1.0);
    } catch (_) {}
  }

  Future<void> _loadData() async {
    final locale = Localizations.localeOf(context).languageCode;
    try {
      // 1. Load Sentence Builder JSON
      final sbStr = await DefaultAssetBundle.of(context).loadString('assets/content/$locale/sentence_builder.json');
      final sbMap = json.decode(sbStr) as Map<String, dynamic>;

      // 2. Load Alphabet JSON
      final alphaStr = await DefaultAssetBundle.of(context).loadString('assets/content/$locale/alphabet.json');
      final alphaList = json.decode(alphaStr) as List;

      final List<String> letters = [];
      final Map<String, _LetterGameObject> gameObjs = {};

      for (final item in alphaList) {
        final letter = item['letter'] as String;
        final emoji = item['emoji'] as String;
        final word = item['word'] as String;
        letters.add(letter);
        gameObjs[letter] = _LetterGameObject(letter: letter, emoji: emoji, word: word);
      }

      setState(() {
        _sbData = sbMap;
        _alphabet = letters;
        _gameObjects = gameObjs;
        
        _shuffledLetters.clear();
        _shuffledLetters.addAll(_alphabet);
        _shuffledLetters.shuffle();

        // Set default values if first time loading
        final whoOpts = sbMap['whoOptions'] as List;
        final verbOpts = sbMap['verbOptions'] as List;
        if (_sentenceWho == null && whoOpts.isNotEmpty) {
          _sentenceWho = whoOpts[0] as String;
        }
        if (_sentenceVerb == null && verbOpts.isNotEmpty) {
          _sentenceVerb = verbOpts[0] as String;
        }

        _loading = false;
      });
    } catch (e) {
      debugPrint("Error loading sentence builder/alphabet data: $e");
      setState(() => _loading = false);
    }
  }

  void _speak(String text) async {
    await _speakGameText(text);
  }

  String _spokenTurkishLetter(String letter) {
    const map = {
      'A': 'a',
      'B': 'be',
      'C': 'ce',
      'Ç': 'çe',
      'D': 'de',
      'E': 'e',
      'F': 'fe',
      'G': 'ge',
      'Ğ': 'yumuşak ge',
      'H': 'he',
      'I': 'ı',
      'İ': 'i',
      'J': 'je',
      'K': 'ke',
      'L': 'le',
      'M': 'me',
      'N': 'ne',
      'O': 'o',
      'Ö': 'ö',
      'P': 'pe',
      'R': 're',
      'S': 'se',
      'Ş': 'şe',
      'T': 'te',
      'U': 'u',
      'Ü': 'ü',
      'V': 've',
      'Y': 'ye',
      'Z': 'ze',
    };
    return map[letter] ?? letter.toLowerCase();
  }

  void _onLetterTap(String letter) {
    setState(() {
      _pressedLetter = letter;
    });
    _speak('${_spokenTurkishLetter(letter)} harfi');
    HapticFeedback.mediumImpact();
    Timer(const Duration(milliseconds: 250), () {
      if (mounted) {
        setState(() {
          _pressedLetter = null;
        });
      }
    });
  }

  void _onGameLetterTap(String letter, String emoji, String word) {
    setState(() {
      _activeGameLetter = letter;
    });
    HapticFeedback.mediumImpact();

    final loc = AppLocalizations.of(context)!;
    final spokenLetter = _spokenTurkishLetter(letter);
    final isTr = Localizations.localeOf(context).languageCode == 'tr';
    if (isTr) {
      _speak('Evet, bu $spokenLetter harfi. $word.');
    } else {
      _speak(loc.letterGameCorrect(spokenLetter, word));
    }

    showDialog(
      context: context,
      builder: (context) => Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(32)),
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                loc.letterGameCorrectTitle(letter),
                style: const TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF8B5CF6),
                ),
              ),
              const SizedBox(height: 20),
              Container(
                width: 140,
                height: 140,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: const Color(0xFFF5F3FF),
                  borderRadius: BorderRadius.circular(28),
                  border: Border.all(color: const Color(0xFFDDD6FE), width: 2),
                ),
                child: Text(
                  emoji,
                  style: const TextStyle(fontSize: 80),
                ),
              ),
              const SizedBox(height: 16),
              Text(
                word,
                style: const TextStyle(
                  fontSize: 26,
                  fontWeight: FontWeight.w900,
                  color: Color(0xFF1F2937),
                ),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () => Navigator.pop(context),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF8B5CF6),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                  padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 14),
                  elevation: 2,
                ),
                child: Text(
                  loc.btnClose,
                  style: const TextStyle(fontWeight: FontWeight.w900, color: Colors.white, fontSize: 16),
                ),
              )
            ],
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _tabController.dispose();
    _flutterTts.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading || _sbData == null) {
      return const Center(child: CircularProgressIndicator());
    }

    final loc = AppLocalizations.of(context)!;

    return Column(
      children: [
        Container(
          color: Colors.white,
          child: TabBar(
            controller: _tabController,
            indicatorColor: const Color(0xFF8B5CF6),
            labelColor: const Color(0xFF8B5CF6),
            unselectedLabelColor: const Color(0xFF6B7280),
            labelStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13.5),
            tabs: [
              Tab(icon: const Icon(Icons.chat_bubble_outline_rounded), text: loc.tabSentenceBuilder),
              Tab(icon: const Icon(Icons.translate_rounded), text: loc.tabSoundsTable),
              Tab(icon: const Icon(Icons.extension_rounded), text: loc.tabLetterGame),
            ],
          ),
        ),
        Expanded(
          child: TabBarView(
            controller: _tabController,
            children: [
              _buildSentenceBuilder(),
              _buildSoundsTable(),
              _buildGameSection(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildSentenceBuilder() {
    final loc = AppLocalizations.of(context)!;
    final sentenceText = [
      if (_sentenceWho != null) _sentenceWho,
      if (_sentenceWhat != null) _sentenceWhat,
      if (_sentenceWhere != null) _sentenceWhere,
      if (_sentenceWhen != null) _sentenceWhen,
      if (_sentenceVerb != null) _sentenceVerb,
    ].join(' ');

    final whoOptions = List<String>.from(_sbData!['whoOptions']);
    final whatOptions = List<String>.from(_sbData!['whatOptions']);
    final whereWhenOptions = List<String>.from(_sbData!['whereWhenOptions']);
    final whereValues = List<String>.from(_sbData!['whereValues']);
    final verbOptions = List<String>.from(_sbData!['verbOptions']);
    final quickWordLabel = _sbData!['quickWordLabel'] as String;

    return Container(
      color: const Color(0xFFF9FAFB),
      child: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Selected Message Display
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(24),
              border: Border.all(color: const Color(0xFF1F2937), width: 3),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withOpacity(0.04),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Text(
              sentenceText.isEmpty ? loc.sentenceBuilderPlaceholder : '$sentenceText.',
              textAlign: TextAlign.center,
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w900,
                color: Color(0xFF1F2937),
              ),
            ),
          ),
          const SizedBox(height: 20),

          // Who
          _buildSentenceSection(
            title: _sbData!['whoTitle'] as String,
            options: whoOptions,
            selected: _sentenceWho,
            onSelected: (val) => setState(() => _sentenceWho = _sentenceWho == val ? null : val),
            activeColor: const Color(0xFFD1FAE5),
            activeTextColor: const Color(0xFF065F46),
          ),
          const SizedBox(height: 16),

          // What
          _buildSentenceSection(
            title: _sbData!['whatTitle'] as String,
            options: whatOptions,
            selected: _sentenceWhat,
            onSelected: (val) => setState(() => _sentenceWhat = _sentenceWhat == val ? null : val),
            activeColor: const Color(0xFFFEF3C7),
            activeTextColor: const Color(0xFF92400E),
          ),
          const SizedBox(height: 16),

          // Where / When
          _buildSentenceSection(
            title: _sbData!['whereWhenTitle'] as String,
            options: whereWhenOptions,
            selected: _sentenceWhere ?? _sentenceWhen,
            onSelected: (val) => setState(() {
              if (whereValues.contains(val)) {
                _sentenceWhere = _sentenceWhere == val ? null : val;
                _sentenceWhen = null;
              } else {
                _sentenceWhen = _sentenceWhen == val ? null : val;
                _sentenceWhere = null;
              }
            }),
            activeColor: const Color(0xFFE0E7FF),
            activeTextColor: const Color(0xFF3730A3),
          ),
          const SizedBox(height: 16),

          // Verb
          _buildSentenceSection(
            title: _sbData!['verbTitle'] as String,
            options: verbOptions,
            selected: _sentenceVerb,
            onSelected: (val) => setState(() => _sentenceVerb = _sentenceVerb == val ? null : val),
            activeColor: const Color(0xFFD1FAE5),
            activeTextColor: const Color(0xFF065F46),
          ),
          const SizedBox(height: 20),

          // Quick Word
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: Text(
              _sbData!['quickWordTitle'] as String,
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w900,
                color: Color(0xFF9CA3AF),
                letterSpacing: 1.0,
              ),
            ),
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            children: [
              ActionChip(
                label: Text(
                  quickWordLabel,
                  style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF991B1B)),
                ),
                backgroundColor: const Color(0xFFFEE2E2),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                side: BorderSide(color: const Color(0xFFFCA5A5).withOpacity(0.5)),
                onPressed: () {
                  final qwState = _sbData!['quickWordState'] as Map;
                  setState(() {
                    _sentenceWho = qwState['who'] as String?;
                    _sentenceWhat = qwState['what'] as String?;
                    _sentenceWhere = qwState['where'] as String?;
                    _sentenceWhen = qwState['when'] as String?;
                    _sentenceVerb = qwState['verb'] as String?;
                  });
                },
              ),
            ],
          ),
          const SizedBox(height: 28),

          // Speak & Clear Actions
          Row(
            children: [
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: sentenceText.isEmpty ? null : () => _speak(sentenceText),
                  icon: const Icon(Icons.volume_up_rounded, color: Colors.white, size: 24),
                  label: Text(loc.sentenceSpeakButton, style: const TextStyle(fontWeight: FontWeight.w900, color: Colors.white, fontSize: 16)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF1F2937),
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                    elevation: 2,
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton.icon(
                  onPressed: () {
                    setState(() {
                      _sentenceWho = null;
                      _sentenceWhat = null;
                      _sentenceWhere = null;
                      _sentenceWhen = null;
                      _sentenceVerb = null;
                    });
                  },
                  icon: const Icon(Icons.refresh_rounded, color: Color(0xFF4B5563), size: 24),
                  label: Text(loc.sentenceClearButton, style: const TextStyle(fontWeight: FontWeight.w900, color: Color(0xFF4B5563), fontSize: 16)),
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 16),
                    side: const BorderSide(color: Color(0xFFD1D5DB), width: 2),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 48),
        ],
      ),
    );
  }

  Widget _buildSentenceSection({
    required String title,
    required List<String> options,
    required String? selected,
    required ValueChanged<String> onSelected,
    required Color activeColor,
    required Color activeTextColor,
  }) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 4),
          child: Text(
            title,
            style: const TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w900,
              color: Color(0xFF9CA3AF),
              letterSpacing: 1.0,
            ),
          ),
        ),
        const SizedBox(height: 8),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: options.map((opt) {
            final isSel = selected == opt;
            return ChoiceChip(
              label: Text(
                opt,
                style: TextStyle(
                  fontWeight: FontWeight.w900,
                  color: isSel ? activeTextColor : const Color(0xFF4B5563),
                ),
              ),
              selected: isSel,
              selectedColor: activeColor,
              backgroundColor: Colors.white,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
                side: BorderSide(
                  color: isSel ? activeTextColor.withOpacity(0.5) : const Color(0xFFE5E7EB),
                  width: 1.5,
                ),
              ),
              onSelected: (_) => onSelected(opt),
            );
          }).toList(),
        ),
      ],
    );
  }

  Widget _buildSoundsTable() {
    return Container(
      color: const Color(0xFFF9FAFB),
      child: GridView.builder(
        padding: const EdgeInsets.all(16),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 4,
          crossAxisSpacing: 12,
          mainAxisSpacing: 12,
          childAspectRatio: 1.0,
        ),
        itemCount: _alphabet.length,
        itemBuilder: (context, idx) {
          final letter = _alphabet[idx];
          final color = _letterColors[idx % _letterColors.length];
          final isPressed = _pressedLetter == letter;

          return AnimatedContainer(
            duration: const Duration(milliseconds: 150),
            curve: Curves.easeOut,
            transform: isPressed ? Matrix4.diagonal3Values(1.12, 1.12, 1.0) : Matrix4.identity(),
            decoration: BoxDecoration(
              color: isPressed ? color.withOpacity(0.4) : color,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: isPressed ? const Color(0xFF8B5CF6) : color.withOpacity(0.6),
                width: isPressed ? 4.0 : 1.5,
              ),
              boxShadow: isPressed
                  ? [BoxShadow(color: const Color(0xFF8B5CF6).withOpacity(0.4), blurRadius: 12, spreadRadius: 2)]
                  : [BoxShadow(color: Colors.black.withOpacity(0.02), blurRadius: 4, offset: const Offset(0, 2))],
            ),
            child: InkWell(
              onTap: () => _onLetterTap(letter),
              borderRadius: BorderRadius.circular(20),
              child: Center(
                child: Text(
                  letter,
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.w900,
                    color: isPressed ? const Color(0xFF8B5CF6) : const Color(0xFF1F2937),
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }

  Widget _buildGameSection() {
    final loc = AppLocalizations.of(context)!;
    return Container(
      color: const Color(0xFFF9FAFB),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            color: Colors.white,
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  loc.letterGameTitle,
                  style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900, color: Color(0xFF1F2937)),
                ),
                const SizedBox(height: 4),
                Text(
                  loc.letterGameSubtitle,
                  style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: Color(0xFF6B7280)),
                ),
              ],
            ),
          ),
          Expanded(
            child: GridView.builder(
              padding: const EdgeInsets.all(16),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 4,
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.0,
              ),
              itemCount: _shuffledLetters.length,
              itemBuilder: (context, idx) {
                final letter = _shuffledLetters[idx];
                final color = _letterColors[(idx + 3) % _letterColors.length];
                final gameObj = _gameObjects[letter];

                return Card(
                  elevation: 0,
                  color: color,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                    side: BorderSide(color: color.withOpacity(0.6), width: 1.5),
                  ),
                  child: InkWell(
                    onTap: gameObj == null ? null : () => _onGameLetterTap(letter, gameObj.emoji, gameObj.word),
                    borderRadius: BorderRadius.circular(20),
                    child: Center(
                      child: Text(
                        letter,
                        style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900, color: Color(0xFF1F2937)),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _ImitationModuleBody extends StatefulWidget {
  const _ImitationModuleBody();

  @override
  State<_ImitationModuleBody> createState() => _ImitationModuleBodyState();
}

class _ImitationModuleBodyState extends State<_ImitationModuleBody> {
  final FlutterTts _flutterTts = FlutterTts();
  List<Map<String, dynamic>> _steps = [];
  int _currentStepIdx = -1;
  String _currentAction = 'idle';
  double _verticalOffset = 0.0;
  bool _eyesClosed = false;
  double _leftArmTurns = 0.0; // 0.0 down, -0.5 up
  double _rightArmTurns = 0.0; // 0.0 down, 0.5 up
  bool _isClapping = false;
  bool _loading = true;

  final String _idleImageAsset = 'assets/imitation_idle.png';

  @override
  void initState() {
    super.initState();
    _initTts();
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    _loadSteps();
  }

  void _initTts() async {
    try {
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'tr' ? 'tr-TR' : 'en-US');
      await _flutterTts.setSpeechRate(0.45);
      await _flutterTts.setPitch(1.0);
    } catch (_) {}
  }

  Future<void> _loadSteps() async {
    final locale = Localizations.localeOf(context).languageCode;
    try {
      final jsonStr = await DefaultAssetBundle.of(context).loadString('assets/content/$locale/imitation.json');
      final list = json.decode(jsonStr) as List;
      final parsed = list.map((item) {
        return {
          'title': item['title'] as String,
          'voice': item['voice'] as String,
          'action': item['action'] as String,
          'imageAsset': item['imageAsset'] as String,
        };
      }).toList();

      setState(() {
        _steps = parsed;
        _loading = false;
      });
    } catch (e) {
      debugPrint("Error loading imitation steps: $e");
      setState(() => _loading = false);
    }
  }

  void _speak(String text) async {
    try {
      final locale = Localizations.localeOf(context).languageCode;
      await _flutterTts.setLanguage(locale == 'tr' ? 'tr-TR' : 'en-US');
      await _flutterTts.stop();
      await _flutterTts.speak(text);
    } catch (_) {}
  }

  void _nextStep() {
    if (_isClapping || _steps.isEmpty) return; // Clapping is in progress or empty steps, ignore clicks

    setState(() {
      _currentStepIdx = (_currentStepIdx + 1) % _steps.length;
      final step = _steps[_currentStepIdx];
      _currentAction = step['action'];
      
      // Reset defaults
      _eyesClosed = false;
      _verticalOffset = 0.0;
      _leftArmTurns = 0.0;
      _rightArmTurns = 0.0;

      // Speak command
      _speak(step['voice']);
      HapticFeedback.mediumImpact();

      // Set arm/body values based on action
      if (_currentAction == 'raiseArms') {
        _leftArmTurns = -0.38; // Up-outward
        _rightArmTurns = 0.38;
      } else if (_currentAction == 'crossArms') {
        _leftArmTurns = 0.12; // Cross over chest
        _rightArmTurns = -0.12;
      } else if (_currentAction == 'raiseHands') {
        _leftArmTurns = -0.45; // Straight up
        _rightArmTurns = 0.45;
      } else if (_currentAction == 'showEar') {
        _leftArmTurns = 0.0;
        _rightArmTurns = 0.32; // Reach left ear
      } else if (_currentAction == 'closeEyes') {
        _eyesClosed = true;
      } else if (_currentAction == 'showNose') {
        _leftArmTurns = -0.32; // Reach nose
        _rightArmTurns = 0.0;
      } else if (_currentAction == 'jump') {
        _leftArmTurns = -0.25;
        _rightArmTurns = 0.25;
        // Jump animation trigger
        _verticalOffset = -60.0;
        Timer(const Duration(milliseconds: 300), () {
          if (mounted) {
            setState(() {
              _verticalOffset = 0.0;
            });
          }
        });
      } else if (_currentAction == 'clap') {
        _isClapping = true;
        _runClappingAnimation();
      }
    });
  }

  void _runClappingAnimation() {
    int count = 0;
    Timer.periodic(const Duration(milliseconds: 150), (timer) {
      if (!mounted) {
        timer.cancel();
        return;
      }
      setState(() {
        if (count % 2 == 0) {
          _leftArmTurns = 0.12; // Inside
          _rightArmTurns = -0.12;
        } else {
          _leftArmTurns = -0.10; // Open
          _rightArmTurns = 0.10;
        }
        count++;
        if (count >= 6) {
          timer.cancel();
          _isClapping = false;
          _leftArmTurns = 0.0;
          _rightArmTurns = 0.0;
        }
      });
    });
  }

  @override
  void dispose() {
    _flutterTts.stop();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_loading || _steps.isEmpty) {
      return const Center(child: CircularProgressIndicator());
    }

    final loc = AppLocalizations.of(context)!;
    final step = _currentStepIdx == -1 ? null : _steps[_currentStepIdx];

    return Scaffold(
      backgroundColor: const Color(0xFFF9FAFB),
      body: InkWell(
        onTap: _nextStep,
        splashColor: Colors.transparent,
        highlightColor: Colors.transparent,
        child: Container(
          width: double.infinity,
          height: double.infinity,
          padding: const EdgeInsets.all(24),
          child: Column(
            children: [
              // Info Banner
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFECFDF5),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(color: const Color(0xFFA7F3D0), width: 1.5),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.touch_app_rounded, color: Color(0xFF10B981), size: 28),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        loc.imitationBannerHint,
                        style: const TextStyle(
                          fontSize: 13.5,
                          fontWeight: FontWeight.w900,
                          color: Color(0xFF065F46),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Step Title Card
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(28),
                  border: Border.all(color: Colors.grey.shade200, width: 1.5),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.black.withOpacity(0.02),
                      blurRadius: 10,
                      offset: const Offset(0, 4),
                    ),
                  ],
                ),
                child: Column(
                  children: [
                    Text(
                      step != null ? step['title'].toUpperCase() : loc.imitationStartGame,
                      style: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w900,
                        color: step != null ? const Color(0xFF10B981) : Colors.grey,
                        letterSpacing: 1.5,
                      ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      step != null ? step['voice'] : loc.imitationStartHint,
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        fontSize: 22,
                        fontWeight: FontWeight.w900,
                        color: Color(0xFF1F2937),
                      ),
                    ),
                  ],
                ),
              ),
              const Spacer(),

              // Video / Live Action Panel (Real Child with Fallback)
              Center(
                child: Container(
                  width: 320,
                  height: 380,
                  decoration: BoxDecoration(
                    color: Colors.black,
                    borderRadius: BorderRadius.circular(32),
                    border: Border.all(color: const Color(0xFF1F2937), width: 6),
                    boxShadow: [
                      BoxShadow(
                        color: const Color(0xFF10B981).withOpacity(0.15),
                        blurRadius: 20,
                        spreadRadius: 2,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(26),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        // The actual real-child AI Photo
                        Image.asset(
                          step != null ? step['imageAsset'] : _idleImageAsset,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            // Offline fallback to 2D animated boy
                            return _buildFallbackBoy();
                          },
                        ),

                        // Vignette overlay for premium movie/video feel
                        IgnorePointer(
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: RadialGradient(
                                colors: [
                                  Colors.transparent,
                                  Colors.black.withOpacity(0.45),
                                ],
                                radius: 1.1,
                              ),
                            ),
                          ),
                        ),

                        // LIVE Red Badge overlay
                        Positioned(
                          top: 16,
                          left: 16,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                            decoration: BoxDecoration(
                              color: Colors.red.shade600,
                              borderRadius: BorderRadius.circular(30),
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.red.withOpacity(0.5),
                                  blurRadius: 8,
                                  spreadRadius: 1,
                                ),
                              ],
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.circle, size: 8, color: Colors.white),
                                const SizedBox(width: 6),
                                Text(
                                  loc.imitationLivePanel,
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontSize: 10,
                                    fontWeight: FontWeight.w900,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),

                        // HD Badge overlay
                        Positioned(
                          top: 16,
                          right: 16,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                            decoration: BoxDecoration(
                              color: Colors.black.withOpacity(0.6),
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: Colors.white24, width: 1),
                            ),
                            child: const Text(
                              '1080p HD',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 9,
                                fontWeight: FontWeight.w900,
                              ),
                            ),
                          ),
                        ),

                        // Bottom Action Name overlay
                        Positioned(
                          bottom: 0,
                          left: 0,
                          right: 0,
                          child: Container(
                            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.bottomCenter,
                                end: Alignment.topCenter,
                                colors: [
                                  Colors.black.withOpacity(0.85),
                                  Colors.transparent,
                                ],
                              ),
                            ),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Expanded(
                                  child: Text(
                                    step != null ? '${loc.imitationPrefix}: ${step['title']}' : loc.imitationReady,
                                    style: const TextStyle(
                                      color: Colors.white,
                                      fontSize: 14,
                                      fontWeight: FontWeight.w900,
                                    ),
                                  ),
                                ),
                                Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                  decoration: BoxDecoration(
                                    color: const Color(0xFF10B981),
                                    borderRadius: BorderRadius.circular(6),
                                  ),
                                  child: const Text(
                                    'AUTO',
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 10,
                                      fontWeight: FontWeight.w900,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const Spacer(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildFallbackBoy() {
    return Stack(
      alignment: Alignment.center,
      children: [
        // Background sky/garden gradient
        Container(
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [
                Color(0xFFBAE6FD), // Sky blue
                Color(0xFFE0F2FE),
                Color(0xFFDCFCE7), // Light green ground
              ],
            ),
          ),
        ),

        // Left Leg
        Positioned(
          left: 130,
          top: 230 + _verticalOffset,
          child: _buildLeg(),
        ),

        // Right Leg
        Positioned(
          right: 130,
          top: 230 + _verticalOffset,
          child: _buildLeg(),
        ),

        // Left Arm (Animated Rotation and Position)
        AnimatedPositioned(
          duration: const Duration(milliseconds: 200),
          top: 140 + _verticalOffset,
          left: 65,
          child: AnimatedRotation(
            turns: _leftArmTurns,
            duration: const Duration(milliseconds: 200),
            alignment: Alignment.topRight,
            child: _buildArm(isLeft: true),
          ),
        ),

        // Right Arm (Animated Rotation and Position)
        AnimatedPositioned(
          duration: const Duration(milliseconds: 200),
          top: 140 + _verticalOffset,
          right: 65,
          child: AnimatedRotation(
            turns: _rightArmTurns,
            duration: const Duration(milliseconds: 200),
            alignment: Alignment.topLeft,
            child: _buildArm(isLeft: false),
          ),
        ),

        // Torso / Body (T-Shirt)
        AnimatedPositioned(
          duration: const Duration(milliseconds: 200),
          top: 130 + _verticalOffset,
          child: Container(
            width: 100,
            height: 120,
            decoration: BoxDecoration(
              color: const Color(0xFF3B82F6), // Blue T-Shirt
              borderRadius: const BorderRadius.only(
                topLeft: Radius.circular(28),
                topRight: Radius.circular(28),
                bottomLeft: Radius.circular(16),
                bottomRight: Radius.circular(16),
              ),
              border: Border.all(color: const Color(0xFF1D4ED8), width: 3),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 4, offset: const Offset(0, 3)),
              ],
            ),
            child: Center(
              child: Icon(
                Icons.star_rounded,
                color: const Color(0xFFFBBF24), // Yellow Star emblem
                size: 40,
                shadows: [
                  Shadow(color: Colors.black.withOpacity(0.1), offset: const Offset(0, 2), blurRadius: 4),
                ],
              ),
            ),
          ),
        ),

        // Head with Facial Features
        AnimatedPositioned(
          duration: const Duration(milliseconds: 200),
          top: 50 + _verticalOffset,
          child: Container(
            width: 96,
            height: 96,
            decoration: BoxDecoration(
              color: const Color(0xFFFED7AA), // Peach Skin tone
              shape: BoxShape.circle,
              border: Border.all(color: const Color(0xFFEA580C), width: 3),
              boxShadow: [
                BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 4, offset: const Offset(0, 3)),
              ],
            ),
            child: Stack(
              alignment: Alignment.center,
              children: [
                // Hair
                Positioned(
                  top: -2,
                  child: Container(
                    width: 80,
                    height: 24,
                    decoration: const BoxDecoration(
                      color: Color(0xFF78350F), // Brown Hair
                      borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(40),
                        topRight: Radius.circular(40),
                        bottomLeft: Radius.circular(10),
                        bottomRight: Radius.circular(10),
                      ),
                    ),
                  ),
                ),

                // Eyes
                Positioned(
                  top: 38,
                  left: 24,
                  child: _buildEye(_eyesClosed),
                ),
                Positioned(
                  top: 38,
                  right: 24,
                  child: _buildEye(_eyesClosed),
                ),

                // Nose
                Positioned(
                  top: 48,
                  child: Container(
                    width: 8,
                    height: 12,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFDBA74),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  ),
                ),

                // Mouth (Smiley)
                Positioned(
                  top: 58,
                  child: Container(
                    width: 32,
                    height: 16,
                    decoration: BoxDecoration(
                      color: Colors.transparent,
                      borderRadius: const BorderRadius.only(
                        bottomLeft: Radius.circular(16),
                        bottomRight: Radius.circular(16),
                      ),
                      border: Border.all(color: const Color(0xFF991B1B), width: 3),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildEye(bool closed) {
    if (closed) {
      return Container(
        width: 14,
        height: 3,
        color: const Color(0xFF1F2937),
      );
    }
    return Container(
      width: 12,
      height: 12,
      decoration: const BoxDecoration(
        color: Color(0xFF1F2937),
        shape: BoxShape.circle,
      ),
      child: Stack(
        children: [
          // Eye shine (pupil white reflex)
          Positioned(
            top: 2,
            left: 2,
            child: Container(
              width: 4,
              height: 4,
              decoration: const BoxDecoration(
                color: Colors.white,
                shape: BoxShape.circle,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildArm({required bool isLeft}) {
    return Container(
      width: 20,
      height: 90,
      decoration: BoxDecoration(
        color: const Color(0xFFFED7AA), // Peach Skin tone
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: const Color(0xFFEA580C), width: 2.5),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          // Hand
          Container(
            width: 14,
            height: 14,
            margin: const EdgeInsets.only(bottom: 2),
            decoration: const BoxDecoration(
              color: Color(0xFFFDBA74),
              shape: BoxShape.circle,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLeg() {
    return Container(
      width: 24,
      height: 90,
      decoration: BoxDecoration(
        color: const Color(0xFFFED7AA), // Skin Tone
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(8),
          topRight: Radius.circular(8),
          bottomLeft: Radius.circular(16),
          bottomRight: Radius.circular(16),
        ),
        border: Border.all(color: const Color(0xFFEA580C), width: 2.5),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          // Shoe
          Container(
            width: 32,
            height: 16,
            decoration: const BoxDecoration(
              color: Color(0xFFEF4444), // Red shoes
              borderRadius: BorderRadius.all(Radius.circular(8)),
            ),
          ),
        ],
      ),
    );
  }
}